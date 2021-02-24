import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const PORT = '3333';
const uri =`http://localhost:${PORT}/graphql`;
const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@client/dashboard').then((module) => module.DashboardModule),
  },
];

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/graphql`,
//   options: {
//     reconnect: true,
//     // connectionParams: {
//       // authToken: localStorage.getItem(AUTH_TOKEN)
//     // }
//   }
// });
//
// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return (
//       kind === 'OperationDefinition' &&
//       operation === 'subscription'
//     );
//   },
//   wsLink,
//   authLink.concat(httpLink)
// );
//
// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache()
// });

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {
      initialNavigation: 'enabled',
      preloadingStrategy: PreloadAllModules,
      enableTracing: false,
    }),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        // Create an http link:
        const http = httpLink.create({
          uri,
        });

        // Create a WebSocket link:
        const ws = new WebSocketLink({
          uri: `ws://localhost:${PORT}/graphql`,
          options: {
            reconnect: true,
          },
        });

        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
          // split based on operation type
          ({query}) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { kind, operation } = getMainDefinition(query);
            return (
              kind === 'OperationDefinition' && operation === 'subscription'
            );
          },
          ws,
          http,
        );

        return {
          cache: new InMemoryCache(),
          link,
          // ... options
        };
      },
      deps: [HttpLink],
    },
  ],
  // providers: [
  //   {
  //     provide: APOLLO_OPTIONS,
  //     useFactory(httpLink: HttpLink) {
  //       const http = httpLink.create({ uri });
  //       const ws = new WebSocketLink({
  //         uri: `ws://localhost:5000/`,
  //         options: {
  //           reconnect: true,
  //         },
  //       });
  //
  //       // using the ability to split links, you can send data to each link
  //       // depending on what kind of operation is being sent
  //       const link = split(
  //         // split based on operation type
  //         ({query}) => {
  //           const {kind, operation} = getMainDefinition(query);
  //           return (
  //             kind === 'OperationDefinition' && operation === 'subscription'
  //           );
  //         },
  //         ws,
  //         http,
  //       );
  //
  //       return {
  //         link,
  //         // ... options
  //       };
  //     },
  //     deps: [HttpLink],
  //   },
  //
  //     //   return {
  //     //     cache: new InMemoryCache(),
  //     //     link: httpLink.create({ uri }),
  //     //   };
  //     // },
  //     // deps: [HttpLink],
  //   },
  // ],
  bootstrap: [AppComponent],
})
export class AppModule {}
