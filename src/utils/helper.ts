


export const createID = (list: any[]) => {
  return (
    list.reduce((maxId: number, item: any) => Math.max(item.id, maxId), -1) + 1
  );
};
