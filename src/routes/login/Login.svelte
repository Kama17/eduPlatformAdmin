<script lang="ts">
	import { goto } from "$app/navigation";
	import {Alert, Spinner, Button } from "flowbite-svelte";

let errorMessage = '';
let isLoading = false
let isError: Boolean = false

async function login(event: Event) {

    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    isLoading = true;
    errorMessage = "";


    try {
        const response = await fetch('/', {
            method: 'POST',
            body: data
        });

        if (response.ok) {
            await goto('/admin')

        } else if (response.status === 403) {
            isLoading = false;
            errorMessage = 'Access denied. Please check your credentials.';
        } else if (response.status === 400) {
            isLoading = false;
            errorMessage = 'Missing email or password.';
        } else {
            isLoading = false;
            errorMessage = 'An unexpected error occurred. Please try again later.';
        }
    } catch (error) {
        isError = true
        isLoading = false;
        console.error('Error during login:', error);
        errorMessage = 'Unable to connect to the server.';
    }
}

</script>
    <div class="flex flex-col items-center mt-10 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Student Login
                </h1>
                <form on:submit|preventDefault={login} class="space-y-4 md:space-y-6" action="/admin">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="grid justify-items-stretch gap-2">
                        <Button type="submit">
                            {#if isLoading}
                            <Spinner class="me-3" size="4" />
                            Logging...
                            {:else}
                                Login
                            {/if}
                        </Button>
                    </div>
                    {#if errorMessage}
                    <Alert color="yellow">
                        {errorMessage}
                    </Alert>
                    {/if}
                </form>
            </div>
        </div>
    </div>