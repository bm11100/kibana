/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { CoreStart, Plugin, PluginInitializerContext } from 'src/core/public';
import { CasesUiStart, SetupPlugins, StartPlugins } from './types';
import { getCreateCaseLazy } from './methods/get_create_case';
import { getAllCasesLazy } from './methods/get_all_cases';
import { getConfigureCasesLazy } from './methods/get_configure_cases';
import { KibanaServices } from './common/lib/kibana';

/**
 * @public
 * A plugin for retrieving Cases UI components
 */
export class CasesUiPlugin implements Plugin<void, CasesUiStart, SetupPlugins, StartPlugins> {
  private kibanaVersion: string;

  constructor(initializerContext: PluginInitializerContext) {
    this.kibanaVersion = initializerContext.env.packageInfo.version;
  }
  public setup() {}

  public start(core: CoreStart, plugins: StartPlugins): CasesUiStart {
    KibanaServices.init({ ...core, ...plugins, kibanaVersion: this.kibanaVersion });
    return {
      /**
       * Get the all cases table
       * @param props AllCasesProps
       * @return {ReactElement<AllCasesProps>}
       */
      getAllCases: (props) => {
        return getAllCasesLazy(props);
      },
      /**
       * Get the create case form
       * @param props CreateCaseProps
       * @return {ReactElement<CreateCaseProps>}
       */
      getCreateCase: (props) => {
        return getCreateCaseLazy(props);
      },
      /**
       * Get the configure case component
       * @param props ConfigureCasesProps
       * @return {ReactElement<ConfigureCasesProps>}
       */
      getConfigureCases: (props) => {
        return getConfigureCasesLazy(props);
      },
    };
  }

  public stop() {}
}
