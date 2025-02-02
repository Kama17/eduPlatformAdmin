<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  </script>

  <Table>
    <TableHead>
      <TableHeadCell>Chat Name</TableHeadCell>
      <TableHeadCell>Chat ID</TableHeadCell>
      <TableHeadCell>Action</TableHeadCell>
      <TableHeadCell>Description</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      <TableBodyRow>
        <TableBodyCell>VIP</TableBodyCell>
        <TableBodyCell>65334</TableBodyCell>
        <TableBodyCell>new_member_joined</TableBodyCell>
        <TableBodyCell>User 35436 joined the chat</TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>VIP</TableBodyCell>
        <TableBodyCell>65334</TableBodyCell>
        <TableBodyCell>new_member_joined</TableBodyCell>
        <TableBodyCell> message_id: 162, from: id: 6416163049, ...
            <span class="tooltiptext">Full message: message_id: 162, from: id: 6416163049, is_bot: false, first_name: 'Kamil', last_name: 'Wilk', language_code: 'en' ...</span>
          </TableBodyCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>VIP</TableBodyCell>
        <TableBodyCell>65334</TableBodyCell>
        <TableBodyCell>new_member_joined</TableBodyCell>
        <TableBodyCell>User 35436 joined the chat</TableBodyCell>
      </TableBodyRow>
    </TableBody>
  </Table>