function getBookListLength(params) {
  return `${params.row.book_list.length}`;
}

export default [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'classroom', headerName: 'Class', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  {
    field: 'current_books',
    headerName: 'Current Books Checked Out',
    width: 280,
    valueGetter: getBookListLength
  },
  { field: 'num_books', headerName: 'Lifetime Books Checked Out', width: 280 }
];
