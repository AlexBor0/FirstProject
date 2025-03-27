import React from 'react';
import { format } from 'date-fns';

const FormatDate = ({ isoDate }) => {
  try {
    const formattedDate = format(new Date(isoDate), 'dd.MM.yy (HH:mm)');
    return <span>{formattedDate}</span>;
  } catch (error) {
    return <span>Невірна дата</span>;
  }
};

export default FormatDate;