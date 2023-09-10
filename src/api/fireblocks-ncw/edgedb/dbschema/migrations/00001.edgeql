CREATE MIGRATION m15ch3yapdu4ub3zgswlg5arwunvuqgbcmak5vofnr5f3dsnoxproq
    ONTO initial
{
  CREATE TYPE default::Device {
      CREATE REQUIRED PROPERTY deviceId: std::uuid {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.deviceId);
      CREATE PROPERTY createdAt: std::datetime;
      CREATE PROPERTY updatedAt: std::datetime;
      CREATE REQUIRED PROPERTY userId: std::int64;
      CREATE REQUIRED PROPERTY walletId: std::uuid;
  };
  CREATE TYPE default::Message {
      CREATE LINK device: default::Device;
      CREATE PROPERTY createdAt: std::datetime;
      CREATE INDEX ON (.createdAt);
      CREATE REQUIRED PROPERTY deviceId: std::uuid;
      CREATE INDEX ON (.deviceId);
      CREATE REQUIRED PROPERTY messageId: std::int64 {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.messageId);
      CREATE OPTIONAL PROPERTY lastSeen: std::datetime;
      CREATE INDEX ON (.lastSeen);
      CREATE REQUIRED PROPERTY message: std::str;
      CREATE OPTIONAL PROPERTY physicalDeviceId: std::uuid;
      CREATE PROPERTY updatedAt: std::datetime;
  };
  ALTER TYPE default::Device {
      CREATE MULTI LINK msgs: default::Message;
  };
  CREATE TYPE default::User {
      CREATE MULTI LINK devices: default::Device;
      CREATE REQUIRED PROPERTY userId: std::int64 {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.userId);
      CREATE REQUIRED PROPERTY sub: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Device {
      CREATE LINK user: default::User;
  };
  CREATE TYPE default::Wallet {
      CREATE MULTI LINK devices: default::Device;
      CREATE REQUIRED PROPERTY walletId: std::uuid {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Device {
      CREATE LINK wallet: default::Wallet;
  };
  CREATE TYPE default::Transaction {
      CREATE PROPERTY createdAt: std::datetime;
      CREATE INDEX ON (.createdAt);
      CREATE REQUIRED PROPERTY transactionId: std::uuid {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.transactionId);
      CREATE REQUIRED PROPERTY status: std::str;
      CREATE INDEX ON (.status);
      CREATE PROPERTY lastUpdated: std::datetime;
      CREATE INDEX ON (.lastUpdated);
      CREATE MULTI LINK wallets: default::Wallet;
      CREATE REQUIRED PROPERTY details: std::str;
  };
  ALTER TYPE default::Wallet {
      CREATE MULTI LINK transactions: default::Transaction;
  };
};
