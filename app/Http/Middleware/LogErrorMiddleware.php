<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LogErrorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            return $next($request);
        } catch (\Exception $e) {
            // Log the error
            Log::channel('custom')->error($e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);

            // Optionally rethrow the exception to let the default handler process it
            throw $e;
        }
    }
}
