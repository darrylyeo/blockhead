module default {
    type User {
        required property sub -> str {
            constraint exclusive
        };
        multi link devices -> Device;
    };

    type Wallet {
        multi link devices -> Device;
        multi link transactions -> Transaction;
    };

    type Device {
        link user -> User;
        link wallet -> Wallet;
        multi link msgs -> Message;

        property createdAt -> datetime;
        property updatedAt -> datetime;
    };

    type Message {
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
