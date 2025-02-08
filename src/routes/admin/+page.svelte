<script lang="ts">
    import { CheckCircleSolid , CircleMinusSolid, CirclePlusSolid} from 'flowbite-svelte-icons'
    import { Modal, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tabs, TabItem, Button, Toast , Label, Input, P } from 'flowbite-svelte';
    import { Section, Register } from "flowbite-svelte-blocks";
    import BotChats from '$lib/components/botChats.svelte';
    import client from '$lib/database'
    import { page } from '$app/stores'
	  import BotActivity from '$lib/components/botActivity.svelte';
	  import { invalidateAll } from '$app/navigation';
	  import { onDestroy, onMount } from 'svelte';
    import TelegramTable from '$lib/components/TelegramTable.svelte';
    import { writable } from 'svelte/store';


    onMount(() => {
  const channel = client.supabase
    .channel('schema-db-changes')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bot' }, (payload) => {
      invalidateAll();
      console.log('New message INSERT bot:', payload);
    })
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'bot' }, (payload) => {
      invalidateAll();
      console.log('New message DELETE bot:', payload);
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'bot' }, (payload) => {
      invalidateAll();
      console.log('New message UPDATE bot:', payload);
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'telegramGroups' }, (payload) => {
      invalidateAll();
      console.log('New message INSERT telegramGroups:', payload);
    })
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'telegramGroups' }, (payload) => {
      invalidateAll();
      console.log('New message DELETE telegramGroups:', payload);
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'telegramGroups' }, (payload) => {
      invalidateAll();
      console.log('New message UPDATE telegramGroups:', payload);
    })
    .subscribe();

  // Cleanup on component destroy
  onDestroy(() => {
    channel.unsubscribe();
  });
});
    const selectedUser = writable<Item | null>(null);

    let defaultModal = false;

      // Function to open modal with user details
  function openModal(user: Item) {
    selectedUser.set(user);
    defaultModal = true;
    console.log(user)
  }

interface TelegramGroups {
  chatId?: string;
  ChatName?: true;
  userId?: Number;
}

interface UserDetails {
  firstName?: string;
  lastName?: string;
  autoShipDate?: Date
  telegramName?: string
}

interface Item {
  id: string;
  email: string
  active: string
  userDetails: UserDetails[];
  telegramGroups: TelegramGroups[];
}

async function activate(event: Event) {

event.preventDefault();
  const form = event.target as HTMLFormElement;
  const data = new FormData(form);

  const response = await fetch('/admin/activation', {
  method: 'POST',
  body: data


});

  form.reset()

}

    // Update checkbox state in the database
  async function deactivateUser(item: Item) {

    await fetch('/admin/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: "deactivate", userEmail: item.email }),
    });
}

async function renewUser(item: Item)
{
    await fetch('/admin/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: "renew", userEmail: item.email }),
    });
}

async function deleteUser(item: Item)
{
  await fetch('/admin/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: "delete", userEmail: item.email }),
    });
}

async function deleteUserFromChat(chatId: bigint, userId: number)
{
  await fetch('/admin/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: "deleteUserFromChat", userId: userId, chatId: chatId?.toString() }),
    });
}

  </script>

<svelte:head>
	<title>Admin</title>
	<meta name="description" content="Admin" />
</svelte:head>

<Tabs tabStyle="underline">
  <TabItem open title="Telegram">
    <Tabs tabStyle="full" defaultClass="flex rounded divide-x rtl:divide-x-reverse divide-gray-200 shadow dark:divide-gray-700">

      <TabItem class="w-full" open>
        <span slot="title">Chat 1</span>
        <TelegramTable/>
      </TabItem>

      <TabItem class="w-full">
        <span slot="title">Chat 2</span>
      </TabItem>

      <TabItem class="w-full">
        <span slot="title">Chat 3</span>
      </TabItem>

      <TabItem class="w-full">
        <span slot="title">Chat 4</span>
      </TabItem>

    </Tabs>
  </TabItem>

  <TabItem title="Dashboard">
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>Dashboard:</b>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </TabItem>




  <TabItem open title="Users">
<!--placeholder="Search by maker name" hoverable={true} filter={(item, searchTerm) => item.lastName.toLowerCase().includes(searchTerm.toLowerCase())}-->
    <Table items={$page.data.users} class="text-center">
      <TableHead>
        <TableHeadCell >ID</TableHeadCell>
        <TableHeadCell defaultDirection="desc">First Name</TableHeadCell>
        <TableHeadCell defaultDirection="desc">Last Name</TableHeadCell>
        <TableHeadCell >Autoship date</TableHeadCell>
        <TableHeadCell >Days to Renew</TableHeadCell>
        <TableHeadCell >Telegram Name</TableHeadCell>
        <TableHeadCell >Email Address</TableHeadCell>
        <TableHeadCell>Active</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        <TableBodyRow slot="row" let:item>
          <TableBodyCell>{(item as Item).id}</TableBodyCell>
          <TableBodyCell>{(item as Item).userDetails[0]?.firstName ?? ""}</TableBodyCell>
          <TableBodyCell>{(item as Item).userDetails[0]?.lastName ?? ""}</TableBodyCell>
        <TableBodyCell>
          {#if (item as Item).userDetails[0]?.autoShipDate}
          {new Date((item as any).userDetails[0]?.autoShipDate).toLocaleDateString()}
          {:else}
            {null}
          {/if}
        </TableBodyCell>
        <TableBodyCell>
          {#if (item as Item).userDetails[0]?.autoShipDate}
          {@const autoShipDate = new Date((item as Item).userDetails[0]?.autoShipDate ?? new Date()).getTime()}
          {@const currentDate = new Date().getTime()}
          {@const daysToRenew = Math.floor((autoShipDate - currentDate) / (1000 * 60 * 60 * 24))}
          {daysToRenew + 30}
        {/if}
        </TableBodyCell>
          <TableBodyCell>{(item as Item).userDetails[0]?.telegramName ?? ""}</TableBodyCell>
          <TableBodyCell>{(item as Item).email}</TableBodyCell>
          <TableBodyCell class="justify-items-center">
              {#if (item as Item).active === "yes"}
              <CheckCircleSolid color="green"/>
              {:else if (item as Item).active == "pending" }
              <CirclePlusSolid color="yellow"/>
              {:else}
              <CircleMinusSolid color="red"/>
              {/if}
              </TableBodyCell>
              <TableBodyCell>
                <Button  pill outline size="xs" on:click={() => openModal((item) as Item)} color="blue">Info</Button>
              </TableBodyCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  </TabItem>


<TabItem title="Bot">
  <BotChats botChatsList = {$page.data.botChats}/>
 </TabItem>

 <TabItem title="Activity">
   <BotActivity botChatsList = {$page.data.botChats}/>
  </TabItem>


  <TabItem title="Activation">
    <Section name="login">
      <Register href="/">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form on:submit|preventDefault={activate} class="flex flex-col space-y-6" action="/">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Activate an account</h3>
            <Label class="space-y-2">
              <span>Student email</span>
              <Input type="email" name="email" placeholder="name@company.com" required />
            </Label>
            <Button type="submit" class="w-full1">Sent activation link</Button>
          </form>
        </div>
      </Register>
    </Section>

  </TabItem>
</Tabs>


{#key $page.data.users}
<Modal title="User Details" bind:open={defaultModal}>
  {#if $selectedUser}
    <div class="space-y-4">
      <!-- User Info Section -->
      <div class="text-xl font-semibold text-gray-800">
        <p class="font-bold text-gray-500 ">{($selectedUser as any).userDetails[0]?.firstName} {($selectedUser as any).userDetails[0]?.lastName}</p>
        <p class="text-gray-500 text-sm">{($selectedUser as any).email}</p>
      </div>

      <!-- Auto-Ship Date Section -->
      {#if ($selectedUser as any).userDetails[0]?.autoShipDate}
        <div class="flex justify-between">
          <span class="text-gray-700 font-medium">Auto-Ship Date:</span>
          <span class="text-gray-500">{new Date(($selectedUser as any).userDetails[0]?.autoShipDate).toLocaleDateString()}</span>
        </div>
      {/if}

      <!-- Telegram Name Section -->
      {#if ($selectedUser as any).userDetails[0]?.telegramName}
        <div class="flex justify-between">
          <span class="text-gray-700 font-medium">Telegram Name:</span>
          <span class="text-gray-500">{($selectedUser as any).userDetails[0]?.telegramName}</span>
        </div>
      {/if}


      <!-- Telegram Name Section -->
      {#if ($selectedUser as any).userDetails[0]?.telegramId}
        <div class="flex justify-between">
          <span class="text-gray-700 font-medium">Telegram ID:</span>
          <span class="text-gray-500">{($selectedUser as any).userDetails[0]?.telegramId}</span>
        </div>
      {/if}

      <!-- Telegram Groups Section -->
      {#if ($selectedUser as any).telegramGroups && ($selectedUser as any).telegramGroups.length > 0}
        <div class="mt-4">
          <h3 class="text-lg font-semibold text-gray-700">Telegram Groups:</h3>
          <ul class="space-y-2">
            {#each ($selectedUser as any).telegramGroups as group}
              <li class="flex items-center text-gray-500">
                <!-- Icon in front -->
                {#if (group.isActive)}
                <CheckCircleSolid class="mr-2" color="green" />
                {:else}
                <CircleMinusSolid class="mr-2" color="red" />
                {/if}

                <!-- Group Name and ID -->
                <div class="flex-1">
                  <span class="font-medium">{group.chatName}</span>
                </div>
                {#if (group.isActive)}
                <span><Button pill outline color="red" size="xs" on:click={() => deleteUserFromChat((group.chatId as bigint), (group.userId as number))}>Remove</Button></span>
                {:else}
                <span><Button pill outline color="green" size="xs">Add</Button></span>
                {/if}

              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <!-- Active Status Section -->
      <div class="flex justify-between mt-4">
        <span class="text-gray-700 font-medium">Status:</span>
        {#if ($selectedUser as any).active === "yes"}
        <span class="text-sm font-semibold text-green-500">Active</span>
        {:else if ($selectedUser as any).active === "pending"}
        <span class="text-sm font-semibold text-yellow-500">Pending</span>
          {:else}
          <span class="text-sm font-semibold text-red-500">Inactive</span>
        {/if}
      </div>
    </div>
  {/if}

  <svelte:fragment slot="footer">

    {#if ($selectedUser as Item).active === "yes"}
        <Button pill size="xs" color="yellow" on:click={() => deactivateUser(($selectedUser as Item))}>Deactivate</Button>
    {:else}
        <Button pill size="xs" color="green" on:click={() => renewUser(($selectedUser as Item))}>Renew</Button>
    {/if}
        <Button pill  size="xs" color="red" on:click={() => deleteUser(($selectedUser as Item))}>Delete</Button>

    <Toast toastStatus={false} align={false}>Top left positioning.</Toast>
    </svelte:fragment>
</Modal>

{/key}