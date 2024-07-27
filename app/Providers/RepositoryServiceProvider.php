<?php

namespace App\Providers;

use App\Interfaces\CategoryRepositoryInterface;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\CategoryRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;
use App\Interfaces\InvoiceRepositoryInterface;
use App\Repositories\InvoiceRepository;
use App\Interfaces\ItemRepositoryInterface;
use App\Repositories\ItemRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->app->bind(InvoiceRepositoryInterface::class, InvoiceRepository::class);
        $this->app->bind(ItemRepositoryInterface::class, ItemRepository::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
