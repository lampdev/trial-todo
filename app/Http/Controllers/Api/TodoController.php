<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    /**
     * List Todos for only the authenticated user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        return response()->json([
            'toDoItems' => Todo::where('user_id', Auth::id())->get(),
            'success'   => true
        ]);
    }

    /**
     * Create a new Todo for the authenticated user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'description' => ['required'],
        ]);

        $todo = Todo::create([
            'user_id'     => Auth::id(),
            'description' => $request->description
        ]);

        return response()->json([
            'toDoItem' => $todo,
            'success'  => true
        ]);
    }

    /**
     * Update a Todo for the authenticated user
     *
     * @param Todo $toDo
     * @return JsonResponse
     */
    public function update(Todo $toDo)
    {
        $toDo->update(['completed_at' => now()]);

        return response()->json([
            'toDoItem' => $toDo,
            'success'  => true
        ]);
    }

    /**
     * Delete a Todo for the authenticated user
     *
     * @param Todo $toDo
     * @return JsonResponse
     */
    public function destroy(Todo $toDo)
    {
        $toDo->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
