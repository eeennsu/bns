export const setSucResponseData = (data: any) => ({
  ok: true,
  data,
});

export const setSucResponseList = ({
  list,
  totalCount,
  page,
}: {
  list: any;
  totalCount: number;
  page: number;
}) => ({
  ok: true,
  data: {
    list,
    totalCount,
    page,
  },
});
