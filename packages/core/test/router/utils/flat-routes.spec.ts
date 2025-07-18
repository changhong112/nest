import { Module } from '@nestjs/common';
import { expect } from 'chai';
import { flattenRoutePaths } from '../../../router/utils';

describe('flattenRoutePaths', () => {
  it('should flatten all route paths', () => {
    @Module({})
    class ParentModule {}
    @Module({})
    class ChildModule {}
    @Module({})
    class ChildChildModule {}
    @Module({})
    class ChildModule2 {}
    @Module({})
    class ChildModule3 {}
    @Module({})
    class ChildModule4 {}
    @Module({})
    class ChildModule5 {}
    @Module({})
    class ChildModule6 {}
    @Module({})
    class ChildParentPathModule {}
    @Module({})
    class ParentChildModule {}
    @Module({})
    class ChildChildModule2 {}
    @Module({})
    class AuthModule {}
    @Module({})
    class CatsModule {}
    @Module({})
    class DogsModule {}

    @Module({})
    class AuthModule2 {}
    @Module({})
    class CatsModule2 {}
    @Module({})
    class CatsModule3 {}
    @Module({})
    class AuthModule3 {}
    const routes = [
      {
        path: '/parent',
        module: ParentModule,
        children: [
          {
            path: '/child',
            module: ChildModule,
            children: [
              { path: '/child2', module: ChildModule2 },
              {
                path: '/parentchild',
                module: ParentChildModule,
                children: [
                  {
                    path: '/childchild',
                    module: ChildChildModule,
                    children: [
                      { path: '/child2child', module: ChildChildModule2 },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: '/child2',
            children: [
              {
                path: 'child',
                module: ChildModule3,
              },
              ChildModule4,
            ],
          },
          {
            path: 'child3',
            children: [
              {
                path: '',
                module: ChildModule5,
                children: [{ path: 'child', module: ChildParentPathModule }],
              },
            ],
          },
          {
            path: 'child4',
            children: [
              {
                path: '/',
                module: ChildModule6,
              },
            ],
          },
        ],
      },
      { path: '/v1', children: [AuthModule, CatsModule, DogsModule] },
      { path: '/v2', children: [AuthModule2, CatsModule2] },
      { path: '/v3', children: [AuthModule3, CatsModule3] },
    ];
    const expectedRoutes = [
      { path: '/parent', module: ParentModule },
      { path: '/parent/child', module: ChildModule },
      { path: '/parent/child/child2', module: ChildModule2 },
      { path: '/parent/child/parentchild', module: ParentChildModule },
      {
        path: '/parent/child/parentchild/childchild',
        module: ChildChildModule,
      },
      {
        path: '/parent/child/parentchild/childchild/child2child',
        module: ChildChildModule2,
      },
      { path: '/parent/child2', module: ChildModule4 },
      { path: '/parent/child2/child', module: ChildModule3 },
      { path: '/parent/child3', module: ChildModule5 },
      { path: '/parent/child3/child', module: ChildParentPathModule },
      { path: '/parent/child4', module: ChildModule6 },
      { path: '/v1', module: AuthModule },
      { path: '/v1', module: CatsModule },
      { path: '/v1', module: DogsModule },
      { path: '/v2', module: AuthModule2 },
      { path: '/v2', module: CatsModule2 },
      { path: '/v3', module: AuthModule3 },
      { path: '/v3', module: CatsModule3 },
    ];
    expect(flattenRoutePaths(routes)).to.be.eql(expectedRoutes);
  });
});
