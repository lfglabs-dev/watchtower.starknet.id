type Database = {
  _id: string;
  name: string;
  connection_string: string;
  status?: "connected" | "disconnected" | "connecting";
  collections?: Array<any>;
  last_save?: string;
  message?: string;
  custom_name?: string;
};

type DbSave = {
  _id: string;
  db_id: string;
  timestamp: string;
};
