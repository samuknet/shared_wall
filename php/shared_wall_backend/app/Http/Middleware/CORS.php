<?php
/**
 * Created by PhpStorm.
 * User: JoeWood
 * Date: 21/08/2016
 * Time: 21:05
 */


 namespace App\Http\Middleware;
use Closure;

use Illuminate\Contracts\Routing\Middleware;
use Illuminate\Http\Response;

class CORS implements Middleware {

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request)->header('Access-Control-Allow-Origin' , '*')
            ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With');
    }
}