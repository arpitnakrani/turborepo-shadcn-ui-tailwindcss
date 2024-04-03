import { Injectable } from '@nestjs/common';
import { Memphis, MemphisConnectionOptions } from 'memphis-dev/*';
import { memphis } from "memphis-dev";

@Injectable()
export class MemphisService {
    constructor(){}

    private memphisConnection : Memphis;
    private stationName = "test"
    private producerName = "test_producer"
    private consumerName = "test_consumer"
    private consumerGroup = "test_service_consumer"




    async Connection(){
        try{
            this.memphisConnection = await memphis.connect({
                host: "aws-us-east-1.cloud.memphis.dev",
                accountId : 223679547,
                username: "arpit",
                password: "Arpit@2580",
              });
        }catch(err)
        {
            console.log(err , "err_in_connecting_with_memphis_dev")
        }
      
    }

    

    async Produce(){
        try{
            await this.Connection();
            const producer = await this.memphisConnection!.producer({
                stationName: this.stationName,
                producerName: this.producerName,
              });
          
              if(!producer) return "producerFailed"
              const headers = memphis.headers();
              headers.add("KEY", "VALUE");
              let producedData = await producer.produce({
                message: {id : new Date().getTime()}, // you can also send JS object - {}
                headers: headers,
              });
          console.log("producedData =>" , producedData)
              this.memphisConnection!.close();

              return {message : "ProducedData successfully"};
        }catch(err){
            console.log(err , "err_in_producing")
            this.memphisConnection!.close();
        }
    }

    async Consume(){
        try{
            await this.Connection();

            const consumer = await this.memphisConnection!.consumer({
                stationName: this.stationName,
                consumerName: this.consumerName,
                consumerGroup: this.consumerGroup,
              });
              if(!consumer) return "consumerFailed"

            //   consumer.setContext({ key: "value" }); // Optional

          
              let messages = await consumer.fetch({batchSize : 1}); // Fetches 10 messages

            //   console.log("consumedData =>" , messages)
              for (let message of messages){
                  const messageObject = JSON.parse(message.getData().toString());
                  // Do something with the message
                  console.log("messageObject" , messageObject);
                  message.ack();
              }
          
              this.memphisConnection!.close();

              return {message : "Consume successfully" , consumeCount : messages.length} ;

        }catch(err){
            console.log(err , "err_in_consuming")
            this.memphisConnection!.close();
        }
    }



}
