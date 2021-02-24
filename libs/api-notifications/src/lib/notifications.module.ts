import { Module } from '@nestjs/common';
import { DatabaseModule } from '@resilia-notifications/database';
import { GraphqlSchemaModule } from '@resilia-notifications/graphql-schema';
import { PubSub } from 'graphql-subscriptions';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    DatabaseModule,
    GraphqlSchemaModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    NotificationsService,
    NotificationsResolver,
  ],
  exports: [
    NotificationsService,
    NotificationsResolver
  ],
})
export class NotificationsModule {}
