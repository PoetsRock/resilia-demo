import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  outputAs: 'class',
  watch: false,
  typePaths: ['./**/*.graphql'],
  path: join(process.cwd(), 'libs/api-graphql-schema/src/lib/graphql.schema.ts'),
});
