export type TodoResponse = {
  id: string;
  text: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  date: Date;
} ;

export type UserResponse = {
  id: string;
  email: string;
  username: string;
};

export type Payloadtype = {
  userId: string;
};

export type TodoDataType = {
  text: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  userId: string;
};

export type Tokentype = {
  usedAt: string;
  valid: boolean;
};
