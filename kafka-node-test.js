const { v4 } = require('uuid');
const { KafkaClient, Producer, Consumer } = require('kafka-node');

async function kafkaTest() {
    console.log("Starting");
    const topicId = v4().toString();
    const client = new KafkaClient({ kafkaHost: 'kafka:9092', connectTimeout: 6000, requestTimeout: 6000 });
    client.connect();
    await new Promise((resolve) => {
        client.on('ready', () => resolve());
        client.on('error', (err) => reject(`Client connection error: ${err}`));
    });
    console.log("Connected client");
    await new Promise((resolve, reject) => {
        console.log("Creating topic...");

        client.createTopics([{
            topic: topicId,
            partitions: 1,
            replicationFactor: 1
          }], (error, result) => {
            if (error) {
                console.log(`Topic creation: ${error}`);
                reject(error);
            } else {
                console.log("Topic created");
                resolve();
            }
        });

        // producer.createTopics([topicId], (error, data) => {
        //     if (error) {
        //         console.log(`Topic creation: ${error}`);
        //         reject(error);
        //     } else {
        //         console.log("Topic created");
        //         resolve(producer);
        //     }
        // });
    });
    const producer = new Producer(client);
    // await new Promise((resolve) => {
    //     producer.on('ready', () => resolve(producer));
    //     producer.on('error', (err) => reject(`Producer connection error: ${err}`));
    // });
    // console.log("Connected producer");

    const payloads1 = [
        { topic: topicId, messages: 'message' },
    ];
    const payloads2 = [
        { topic: topicId, messages: 'message2' },
    ];
    const payloads3 = [
        { topic: topicId, messages: 'message3' },
    ];
    console.log("Sending messages...");
    await new Promise((resolve, reject) => {
        console.log("Sending1...");
        producer.send(payloads1, (err, data) => {
            if (err) {
                console.log(`Send1: ${err}`);
                reject(err);
            } else {
                console.log('Send1 succeeded');
                resolve();
            }
        });
    });
    await new Promise((resolve, reject) => {
        producer.send(payloads2, (err, data) => {
            console.log("Sending2...");
            if (err) {
                console.log(`Send2: ${err}`);
                reject(err);
            } else {
                console.log('Send2 succeeded');
                resolve();
            }
        });
    });
    await new Promise((resolve, reject) => {
        producer.send(payloads3, (err, data) => {
            console.log("Sending3...");
            if (err) {
                console.log(`Send3: ${err}`);
                reject(err);
            } else {
                console.log('Send3 succeeded');
                resolve();
            }
        });
    });

    console.log("Sending done. Waiting...");

    const consumer = new Consumer(
        client,
        [
            { topic: topicId },
        ],
        {
            groupId: topicId,
            autoCommit: true,
        },
    );

    consumer.on('message', (message) => {
        console.log(`Message: ${message.value.toString()}, offset: ${message.offset}, high water offset: ${message.highWaterOffset}`);
    });
}

kafkaTest().then(() => { process.exit(); }, (err) => { console.log(err);process.exit(); });
