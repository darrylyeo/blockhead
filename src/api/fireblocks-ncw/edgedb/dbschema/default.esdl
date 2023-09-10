module default {
    type User {
        index on (.id);

        required property sub -> str {
            constraint exclusive
        };
        multi link devices -> Device;
    };

    type Wallet {
        index on (.id);
        multi link devices -> Device;
        multi link transactions -> Transaction;
    };

    type Device {
        index on (.id);

        required property userId -> int64;
        required property walletId -> uuid;

        link user -> User;
        link wallet -> Wallet;
        multi link msgs -> Message;

        property createdAt -> datetime;
        property updatedAt -> datetime;
    };

    type Message {
        index on (.id);

        required property deviceId -> uuid;
        index on (.deviceId);

        link device -> Device;

        optional property physicalDeviceId -> uuid;

        required property message -> str;

        optional property lastSeen -> datetime;
        index on (.lastSeen);

        property createdAt -> datetime;
        index on (.createdAt);

        property updatedAt -> datetime;
    };

    type Transaction {
        index on (.id);

        required property status -> str;
        index on (.status);

        property createdAt -> datetime;
        index on (.createdAt);

        property lastUpdated -> datetime;
        index on (.lastUpdated);

        required property details -> str;
        multi link wallets -> Wallet;
    };
};
