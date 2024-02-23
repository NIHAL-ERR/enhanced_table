export const convertString = (str) => {
  switch (str) {
    case "Checked":
      return 'checked';
    case "Name":
      return 'name';
    case "Email":
      return 'email';
    case "Created At":
      return 'createdAt';
    case "Due Date":
      return 'dueDate';
    case "Amount":
      return 'amount';
    case "Status":
      return 'status';
  }
};


