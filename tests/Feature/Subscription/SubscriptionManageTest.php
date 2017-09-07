<?php

namespace Tests\Feature\Subscription;

use App\User;

class SubscriptionManageTest extends SubscriptionBase
{
    public function getUrlList()
    {
        return route('subscriptions.index');
    }

    public function getUrlDelete(int $id)
    {
        return route('subscriptions.delete', ['subscription' => $id]);
    }

    public function getUrlStatus(int $id)
    {
        return route('subscriptions.status', ['subscription' => $id]);
    }

    public function getUrlEdit(int $id)
    {
        return route('subscriptions.edit', ['subscription' => $id]);
    }

    /**
     * @test
     */
    public function user_can_deactivate_subscription()
    {
        $user = factory(User::class)->create();
        $subscription = $this->getSubscription(array_merge($this->locations[0], [
            'is_active' => true,
            'email' => $user->email,
        ]));
        $response = $this->jsonRequestAsUser($user, 'put', $this->getUrlStatus($subscription->id), [
            'status' => 'deactivate',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('subscriptions', [
            'id' => $subscription->id,
            'is_active' => false,
        ]);
    }

    /**
     * @test
     */
    public function user_can_delete_subscription()
    {
        $user = factory(User::class)->create();
        $subscription = $this->getSubscription(array_merge($this->locations[0], [
            'email' => $user->email,
        ]));

        $response = $this->jsonRequestAsUser($user, 'delete', $this->getUrlDelete($subscription->id));

        $response->assertStatus(200);
        $this->assertDatabaseMissing('subscriptions', [
            'id' => $subscription->id,
        ]);
    }

    /**
     * @test
     */
    public function user_can_get_list_self_subscriptions()
    {
        $user = factory(User::class)->create();
        $subscription1 = $this->getSubscription(array_merge($this->locations[0], [
            'email' => $user->email,
        ]));
        $subscription2 = $this->getSubscription(array_merge($this->locations[1], [
            'email' => $user->email,
        ]));

        $response = $this->jsonRequestAsUser($user, 'get', $this->getUrlList());

        $response->assertStatus(200);
        $data = $response->json()['data'];
        $this->assertCount(2, $data);
        $this->assertArraySubset([
            ['id' => $subscription1->id],
            ['id' => $subscription2->id],
        ], $data);
    }

    /**
     * @test
     */
    public function user_can_not_manage_other_users_subscriptions()
    {
        $user = factory(User::class)->create();
        $subscription = $this->getSubscription(array_merge($this->locations[0], [
            'email' => $user->email,
        ]));

        $otherUser = factory(User::class)->create();

        $response = $this->jsonRequestAsUser($otherUser, 'put', $this->getUrlStatus($subscription->id), [
            'status' => 'deactivate',
        ]);

        $response->assertStatus(403);

        $response = $this->jsonRequestAsUser($otherUser, 'delete', $this->getUrlDelete($subscription->id));

        $response->assertStatus(403);

        $response = $this->jsonRequestAsUser($user, 'get', $this->getUrlList());

        $response->assertJsonStructure(['data' => []]);
    }
}
