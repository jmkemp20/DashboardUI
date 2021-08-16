import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DataGrid } from '@material-ui/data-grid';
import { Card } from '@material-ui/core';

const StudentListResults = ({ columns, students, ...rest }) => (
  <Card {...rest}>
    <PerfectScrollbar>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </div>
    </PerfectScrollbar>
  </Card>
);

StudentListResults.propTypes = {
  columns: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired
};

export default StudentListResults;
