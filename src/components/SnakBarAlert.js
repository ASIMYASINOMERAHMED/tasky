import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnakBarAlert({open,message}) {

  return (
    <div> 
      <Snackbar open={open} autoHideDuration={3000}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' ,backgroundColor:"#5ecf55"}}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}