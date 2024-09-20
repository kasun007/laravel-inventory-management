<?php

namespace App\Http\Controllers;

use App\Interfaces\UserRepositoryInterface;

use App\Http\Requests\StoreRequest;

use App\Http\Requests\UpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */

    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }


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
    public function store(StoreRequest $request){

        return response()->json([
            'message' => 'User not found'
        ]);
        
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {

        try {
           return new UserResource($this->userRepository->show($id)); // return the user as a resource

        } catch (ModelNotFoundException $modelNotFoundException) {
            return response()->json([
                'message' => 'User not found'
            ], status: 404);
        } catch (Exception $exception) {
            return response()->json([
                'message' => 'Something went wrong'
            ], status: 500);
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return UserResource|\Illuminate\Http\JsonResponse
     */
    public function update(UpdateRequest $request, $id)
    {


        try {

            $data = $request->validated(); // validated() is a method of FormRequest class
            if (isset($data['password'])) {
                $data['password'] = bcrypt($data['password']);
                $user = $this->userRepository->show($id);
            }

            $user = $this->userRepository > update($data);
            return new UserResource($user); // return the user as a resource

        } catch (ModelNotFoundException $modelNotFoundException) {
            return response()->json([
                'message' => 'User not found'
            ], status: 404);
        } catch (Exception $exception) {
            return response()->json([
                'message' => 'Something went wrong'
            ], status: 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $user = $this->userRepository->show($id);
        $user->delete();
        return \response("null", Response::HTTP_NO_CONTENT);
    }
}
