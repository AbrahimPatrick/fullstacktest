<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function register(Request $request) {
        try {
            $data = $request->all();
            if (!User::where('email', $data['email'])->count()) {
                $data['password'] = bcrypt($data['password']);
                $user = User::create($data);
                return response()->json(['user' => $user, 'message' => 'Usuário cadastrado com sucesso!', 'class' => 'success'], Response::HTTP_CREATED);
            } else {
                return response()->json(['message' => 'Este e-mail já está cadastrado', 'class' => 'danger'], Response::HTTP_NOT_ACCEPTABLE);
            }
        } catch (QueryException $e) {
            return response()->json(['message'=> 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function list() {
        try {
            $user = User::all();

            return response()->json(['users' => $user], Response::HTTP_FOUND);
        } catch (QueryException $e) {
            return response()->json(['message'=> 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function edit($id)
    {
        try {
            $user = User::find($id);

            if ($user) {
                return response()->json(['user' => $user], Response::HTTP_FOUND);
            } else {
                return response()->json(['message' => 'Usuário não encontrado', 'class' => 'danger'], Response::HTTP_NOT_FOUND);
            }
        } catch (QueryException $e) {
            return response()->json(['message'=> 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, $id)
    {
        if (! $request->input('password') == '') {
            $data = $request->all();
            $data['password'] = bcrypt($data['password']);
            try {
                $user = User::find($id)->update($data);
                if ($user) {
                    return response()->json(['user' => $user, 'message' => 'Usuário teve seus dados atualizados. A senha foi alterada.', 'class' => 'success'], Response::HTTP_OK);
                } else {
                    return response()->json(['message' => 'Usuário não encontrado', 'class' => 'danger'], Response::HTTP_NOT_FOUND);
                }
            } catch (QueryException $e) {
                return response()->json(['message'=> 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } else {
            $data = $request->except(['password']);
            try {
                $user = User::find($id)->update($data);
                if ($user) {
                    return response()->json(['user' => $user, 'message' => 'Usuário teve seus dados atualizados.', 'class' => 'success'], Response::HTTP_OK);
                } else {
                    return response()->json(['message' => 'Usuário não encontrado', 'class' => 'danger'], Response::HTTP_NOT_FOUND);
                }
            } catch (QueryException $e) {
                return response()->json(['message'=> 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

    }

    public function delete($id)
    {
        try {
            $user = User::find($id);

            if ($user) {
                $user->delete();
                return response()->json(['message' => 'Usuário excluido com sucesso', 'class' => 'success'], Response::HTTP_OK);
            } else {
                return response()->json(['message' => 'Usuário não encontrado', 'class' => 'danger'], Response::HTTP_NOT_FOUND);
            }
        } catch (QueryException $e) {
            return response()->json(['message'=> 'Erro de conexão com o banco de dados.', 'class' => 'danger'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
