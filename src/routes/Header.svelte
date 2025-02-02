<script lang="ts">
	import { Navbar, NavBrand, NavHamburger, NavLi, NavUl ,Dropdown , DropdownItem} from "flowbite-svelte";
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import logo from "$lib/images/logo.svg"
	import { page } from '$app/stores';



</script>

<Navbar class="font-bold border">
	<NavBrand href="/">
	  <img src={logo} class="me-3 h-6 sm:h-9" alt="Learn2TradePro Logo" />
	  <span class="">Learn 2 Trade Pro</span>
	</NavBrand>
	<NavHamburger />
	<NavUl>
	  <NavLi href="/"></NavLi>
	  <NavLi href="/about">About</NavLi>

	  <NavLi href="/admin">Admin</NavLi>
	   <!-- Conditionally render "Log out" if user is logged in -->
    {#if $page.data.user}
	<form method="POST" action="/logout">
		<button type="submit">
			<NavLi>Log out</NavLi>
		</button>
	</form>
    {/if}
	</NavUl>
  </Navbar>