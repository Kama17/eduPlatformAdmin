<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell,Button } from 'flowbite-svelte';
  </script>

  <Table>
    <TableHead>
      <TableHeadCell>First Name</TableHeadCell>
      <TableHeadCell>Last Name</TableHeadCell>
      <TableHeadCell>Action</TableHeadCell>

    </TableHead>
    <TableBody tableBodyClass="divide-y">
      <TableBodyRow>
        <TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
        <TableBodyCell>Sliver</TableBodyCell>
        <TableBodyCell>Laptop</TableBodyCell>

      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>Microsoft Surface Pro</TableBodyCell>
        <TableBodyCell>White</TableBodyCell>
        <TableBodyCell>Laptop PC</TableBodyCell>

      </TableBodyRow>
      <TableBodyRow>
        <TableBodyCell>Magic Mouse 2</TableBodyCell>
        <TableBodyCell>Black</TableBodyCell>
        <TableBodyCell><Button pill outline size="xs" color="yellow">Deactivate</Button></TableBodyCell>

      </TableBodyRow>
    </TableBody>
  </Table>