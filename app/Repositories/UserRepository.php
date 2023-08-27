<?php


namespace App\Repositories;
use App\Interfaces\UserRepositoryInterface;
use App\Models\User;


class UserRepository implements UserRepositoryInterface
{
    public function all()
    {
        return User::all();

    }
    public function create(array $data)
    {

        return User::create($data);
    }
    public function update(array $data, $id)
    {
        $user = $this->show($id);
        return $user->update($data);
    }
    public function delete($id)
    {
        return User::destroy($id);
    }
    public function show($id)
    {
        return User::findOrFail($id);
    }
}

?>

