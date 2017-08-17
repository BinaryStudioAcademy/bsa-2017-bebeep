<?php

namespace Tests\Feature\User;

use App\User;
use Tests\JwtTestCase;

class UpdatePasswordTest extends JwtTestCase
{
    /**
     * @var array
     */
    private $routeUpdate = ['PUT'];

    public function setUp()
    {
        parent::setUp();

        $this->routeUpdate[] = route('user.profile.password.update');
    }

    /**
     * @test
     */
    public function guest_can_not_update_password()
    {
        $response = $this->json($this->routeUpdate[0], $this->routeUpdate[1]);
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function user_can_not_update_password_with_invalid_data()
    {
        $currentPassword = 'secret_old';
        $newPassword = 'secr';

        $user = factory(User::class)->create(['password' => bcrypt($currentPassword)]);

        // Error - the empty data
        $response = $this->jsonUpdatePassword($user, []);
        $response->assertStatus(422);

        // Error - the current_password is required
        $response = $this->jsonUpdatePassword($user, ['current_password' => null]);
        $response->assertStatus(422)->assertJsonStructure(['current_password' => []]);

        // Error - the password is required
        $response = $this->jsonUpdatePassword($user, ['password' => null]);
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);

        // Error - the password_confirmation is required
        $response = $this->jsonUpdatePassword($user, ['password_confirmation' => null]);
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);

        // Error - the current_password is not current
        $response = $this->jsonUpdatePassword($user, ['current_password' => 'qwerty']);
        $response->assertStatus(422)->assertJsonStructure(['current_password' => []]);

        // Error - the password has not changed (still equals to the current one)
        $response = $this->jsonUpdatePassword($user, ['password' => $currentPassword]);
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);

        // Error - the password is not confirmed
        // (password_confirmation is not equal password)
        $response = $this->jsonUpdatePassword($user, ['password_confirmation' => 'qwerty']);
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);

        // Error - the password size is less
        // than the minimum allowed number of characters
        $response = $this->jsonUpdatePassword($user, ['password' => $newPassword]);
        $response->assertStatus(422)->assertJsonStructure(['password' => []]);
    }

    /**
     * @test
     */
    public function user_can_update_password_with_valid_data()
    {
        $currentPassword = 'secret_old';
        $newPassword = 'secret_new';

        $user = factory(User::class)->create(['password' => bcrypt($currentPassword)]);

        $response = $this->jsonUpdatePassword($user, [
            'current_password' => $currentPassword,
            'password' => $newPassword,
            'password_confirmation' => $newPassword,
        ]);

        $response->assertStatus(200);
    }

    /**
     * Send request on the user password update.
     *
     * @param \App\User $user
     * @param array $updatedData
     *
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function jsonUpdatePassword(User $user, array $updatedData = [])
    {
        return $this->jsonRequestAsUser(
            $user,
            $this->routeUpdate[0],
            $this->routeUpdate[1],
            $updatedData
        );
    }
}
