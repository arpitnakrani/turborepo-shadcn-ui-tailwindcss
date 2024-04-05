import { join } from "path";
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
const AuthServiceOptions  = {
    options : {
        host : "localhost",
        port : "3003",
        url : "localhost:"
    },
    transport : Transport.GRPC
}


console.log("...." , join(__dirname, './auth/auth.proto'))

export const AppProviders = [
  {
    provide: 'GRPC_AUTH_SERVICE',
    useFactory: () => {
      return ClientProxyFactory.create({
        transport: Transport.GRPC , //Transport.GRPC,
        options: {
        //   host: `${authServiceOptions.options.host}`,
        //   port: `${authServiceOptions.options.port}`,
          url : "http://localhost:3003",
          package: 'auth',
          protoPath: join(__dirname, './auth/auth.proto'),
          loader: {
            enums: String,
            objects: true,
            arrays: true,
          },
        },
      });
    },
  }
]

  