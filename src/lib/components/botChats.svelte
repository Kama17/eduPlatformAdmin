<script lang="ts">
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

    export let botChatsList: any

async function botLeaveChat(chatId: BigInt)
{
  await fetch('/admin/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: "botLeaveChat", chatId: chatId.toString()}),
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
        {#if item.isActive}
        <TableBodyRow>
          <TableBodyCell>{item.chatName}</TableBodyCell>
          <TableBodyCell>{item.chatId}</TableBodyCell>
          <TableBodyCell>
          <Button pill size="xs" type="submit" class="w-full1" on:click={() => botLeaveChat((item.chatId as BigInt))}>Leave chat</Button>
        </TableBodyCell>
        </TableBodyRow>
        {/if}

      {/each}

    </TableBody>
  </Table>