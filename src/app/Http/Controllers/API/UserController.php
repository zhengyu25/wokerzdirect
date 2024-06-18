<?php

namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Validator;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;

class UserController extends BaseController
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index(): JsonResponse
    {
        $users = User::all();
        return $this->sendResponse(UserResource::collection($users), 'Users retrieved successfully.');
    }
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();
      
        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
        
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);

        return $this->sendResponse(new UserResource($user), 'User created successfully.');
    } 
    /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    
    public function show($id): JsonResponse
    {
        $user = User::find($id);
        if (is_null($user)) {
            return $this->sendError('Product not found.');
        }
        return $this->sendResponse(new UserResource($user), 'User retrieved successfully.');
    }
    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, User $user): JsonResponse
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'detail' => 'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
        $user->name = $input['name'];
        $user->detail = $input['detail'];
        $user->save();
        
        return $this->sendResponse(new UserResource($user), 'User updated successfully.');
    }
    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return $this->sendResponse([], 'User deleted successfully.');
    }
}
