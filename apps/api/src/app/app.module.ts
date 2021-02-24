import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlSchemaModule } from '@resilia-notifications/graphql-schema';
import { NotificationsModule } from '@resilia-notifications/notifications';
import { AppController } from './app.controller';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      plugins: [],
    }),
    NotificationsModule,
    GraphqlSchemaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
