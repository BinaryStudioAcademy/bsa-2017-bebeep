<?php

namespace Tests\Feature\User;

use App\User;
use Tests\JwtTestCase;

class AvatarTest extends JwtTestCase
{
    /**
     * @var array
     */
    private $routes = [
        'get' => ['GET'],
        'update' => ['PUT'],
        'delete' => ['DELETE'],
    ];

    public function setUp()
    {
        parent::setUp();

        $this->routes['get'][] = route('user.profile.avatar.show');
        $this->routes['update'][] = route('user.profile.avatar.update');
        $this->routes['delete'][] = route('user.profile.avatar.delete');
    }

    /**
     * @test
     */
    public function guest_can_not_get_avatar()
    {
        $response = $this->jsonRequestFromGuest();
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function guest_can_not_update_avatar()
    {
        $response = $this->jsonRequestFromGuest('update');
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function guest_can_not_delete_avatar()
    {
        $response = $this->jsonRequestFromGuest('delete');
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function user_can_get_empty_avatar()
    {
        $user = $this->createUser();
        $response = $this->jsonRequestUserAvatar($user);

        $response->assertStatus(200)->assertExactJson(['avatar' => null]);
    }

    /**
     * @test
     */
    public function user_can_not_update_avatar_basic_validation_failed()
    {
        $user = $this->createUser();

        // Error - the empty data
        $response = $this->jsonRequestUserAvatar($user, 'update');
        $response->assertStatus(422);

        // Error - the avatar is required
        $response = $this->jsonRequestUserAvatar($user, 'update', ['avatar' => null]);
        $response->assertStatus(422);

        // Error - the avatar is not string
        $response = $this->jsonRequestUserAvatar($user, 'update', ['avatar' => 123]);
        $response->assertStatus(422)->assertJsonStructure(['avatar' => []]);
    }

    public function user_can_not_update_avatar_invalid_data_base64()
    {
        $user = $this->createUser();

        // Error - the avatar is not data:URL base64
        $response = $this->jsonRequestUserAvatar($user, 'update', [
            'avatar' => 'Lorem ipsum dolor.',
        ]);
        $response->assertStatus(422)->assertJsonStructure(['error' => '']);
    }

    public function user_can_not_update_avatar_data_base64_has_not_valid_mimetype()
    {
        $user = $this->createUser();
        $dataBase64 = 'data:text/html;charset=utf-8,%3C!DOCTYPE%20HTML%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20HTML%204.0%2F%2FEN%22%3E%0D%0A%3Chtml%20lang%3D%22en%22%3E%0D%0A%3Chead%3E%3Ctitle%3EEmbedded%20Window%3C%2Ftitle%3E%3C%2Fhead%3E%0D%0A%3Cbody%3E%3Ch1%3E42%3C%2Fh1%3E%3C%2Fbody%3E%0D%0A%3C%2Fhtml%3E%0D%0A';

        // Error - the avatar has invalid mimetype
        $response = $this->jsonRequestUserAvatar($user, 'update', [
            'avatar' => $dataBase64,
        ]);
        $response->assertStatus(422)->assertJsonStructure(['error' => '']);
    }

    public function user_can_not_update_avatar_image_size_exceeds_max_file_size()
    {
        $user = $this->createUser();
        $dataBase64 = $this->getImage();
        config(['medialibrary.max_file_size' => 1024 * 1024 * 2]);

        // Error - the avatar image size exceeds max_file_size
        $response = $this->jsonRequestUserAvatar($user, 'update', [
            'avatar' => $dataBase64,
        ]);
        $response->assertStatus(422)->assertJsonStructure(['error' => '']);
    }

    public function user_can_update_avatar_with_valid_data()
    {
        $user = $this->createUser();
        $dataBase64 = $this->getImage();

        $response = $this->jsonRequestUserAvatar($user, 'update', [
            'avatar' => $dataBase64,
        ]);
        $response->assertStatus(200)->assertJsonStructure(['avatar' => '']);
    }

    public function user_can_delete_avatar()
    {
        $user = $this->createUser();
        $dataBase64 = $this->getImage();

        $response = $this->jsonRequestUserAvatar($user, 'update', [
            'avatar' => $dataBase64,
        ]);
        $response->assertStatus(200)->assertJsonStructure(['avatar' => '']);

        $response = $this->jsonRequestUserAvatar($user, 'delete');
        $response->assertStatus(200);

        $response = $this->jsonRequestUserAvatar($user);
        $response->assertStatus(200)->assertExactJson(['avatar' => null]);
    }

    /**
     * Send request to the user avatar from the guest user.
     *
     * @param string $type
     *
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function jsonRequestFromGuest(string $type = 'get')
    {
        return $this->json($this->routes[$type][0], $this->routes[$type][1]);
    }

    /**
     * Send request to the user avatar.
     *
     * @param \App\User $user
     * @param string $type
     * @param array $updatedData
     *
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function jsonRequestUserAvatar(
        User $user,
        string $type = 'get',
        array $updatedData = []
    ) {
        return $this->jsonRequestAsUser(
            $user,
            $this->routes[$type][0],
            $this->routes[$type][1],
            $updatedData
        );
    }

    /**
     * Create the user for testing.
     *
     * @return \App\User
     */
    private function createUser()
    {
        return factory(User::class)->create();
    }

    /**
     * @return string
     */
    private function getImage(): string
    {
        return 'data:image/jpeg;base64,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';
    }
}
