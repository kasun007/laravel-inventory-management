<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequest;
use App\Http\Requests\UpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(10)); // return the users as a resource collection
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     *
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();  // validated() is a method of FormRequest class
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return \response(new UserResource($user), Response::HTTP_CREATED); // return the user as a resource

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return UserResource
     */
    public function show($id)
    {
        return new UserResource(User::findOrFail($id)); // return the user as a resource
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return UserResource
     */
    public function update(UpdateRequest $request, $id)
    {
        $data = $request->validated(); // validated() is a method of FormRequest class
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);

            $user = User::findOrFail($id);
        }


        $user->update($data);
        return  new UserResource($user); // return the user as a resource
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public
    function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return \response("null", Response::HTTP_NO_CONTENT);
    }
}
