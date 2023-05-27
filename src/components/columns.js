import {format} from 'date-fns'

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    disableFilters: true,
    sticky:'left',

  },
  {
    Header: "motherBoard",
    Footer: "motherBoard",
    accessor: "motherBoard",
    sticky:'left',
  },
  {
    Header: "processor",
    Footer: "processor",
    accessor: "processor",
    sticky:'left',
  },
  {
    Header: "videoCard",
    Footer: "videoCard",
    accessor: "videoCard",
    sticky:'left',
  },
  {
    Header: "ram",
    Footer: "ram",
    accessor: "ram",

  },
  {
    Header: "drive",
    Footer: "drive",
    accessor: "drive",

  },

];
export const GROUPED_COLUMNS = [
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "id",
        Footer: "id",
        accessor: "id",
      },
      {
        Header: "motherBoard",
        Footer: "motherBoard",
        accessor: "motherBoard",
      },
      {
        Header: "processor",
        Footer: "processor",
        accessor: "processor",
      },
      {
        Header: "videoCard",
        Footer: "videoCard",
        accessor: "videoCard",
      },
      {
        Header: "ram",
        Footer: "ram",
        accessor: "ram",
      },
      {
        Header: "drive",
        Footer: "drive",
        accessor: "drive",
      },
    ],
  },
];

