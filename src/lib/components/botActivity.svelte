<script lang="ts">
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    export let botChatsList: any


async function activateBot(chatId: BigInt)
{
  await fetch('/admin/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: "activateBot", chatId: chatId.toString()}),
    });

}



  </script>

  <Table>
    <TableHead>
      <TableHeadCell>Chat Name</TableHeadCell>
      <TableHeadCell>Chat ID</TableHeadCell>
      <TableHeadCell>Action</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each botChatsList as item}
        {#if !item.isActive}
        <TableBodyRow>
          <TableBodyCell>{item.chatName}</TableBodyCell>
          <TableBodyCell>{item.chatId}</TableBodyCell>
          <TableBodyCell>
          <Button pill size="xs" type="submit" color="blue" on:click={() => activateBot((item.chatId as BigInt))}>Accept</Button>
        </TableBodyCell>
        </TableBodyRow>
        {/if}

      {/each}

    </TableBody>
  </Table>
