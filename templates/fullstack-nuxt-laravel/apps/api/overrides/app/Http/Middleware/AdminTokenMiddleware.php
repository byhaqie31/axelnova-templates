<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminTokenMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Note: reads env() directly so config:cache isn't required.
        // If you start using config:cache in prod, move ADMIN_API_TOKEN
        // into config/services.php and use config('services.admin_api_token').
        $expected = env('ADMIN_API_TOKEN');
        $provided = $request->bearerToken();

        if (! $expected || ! $provided || ! hash_equals($expected, $provided)) {
            return response()->json(['error' => 'unauthorized'], 401);
        }

        return $next($request);
    }
}
