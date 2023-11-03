import { secberusApiGWGenerated as api } from '../secberusApiGWGenerated';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    listSsoProviders: build.query<
      ListSsoProvidersApiResponse,
      ListSsoProvidersApiArg
    >({
      query: () => ({ url: `/accounts/sso` }),
    }),
    createSsoProvider: build.mutation<
      CreateSsoProviderApiResponse,
      CreateSsoProviderApiArg
    >({
      query: (queryArg) => ({
        url: `/accounts/sso`,
        method: 'POST',
        body: queryArg.addSsoProvider,
      }),
    }),
    getComplianceFrameworks: build.query<
      GetComplianceFrameworksApiResponse,
      GetComplianceFrameworksApiArg
    >({
      query: (queryArg) => ({
        url: `/compliance-frameworks`,
        params: { enabled: queryArg.enabled },
      }),
    }),
    setEnabledFrameworks: build.mutation<
      SetEnabledFrameworksApiResponse,
      SetEnabledFrameworksApiArg
    >({
      query: (queryArg) => ({
        url: `/compliance-frameworks`,
        method: 'PUT',
        body: queryArg.idList,
      }),
    }),
    suppressViolation: build.mutation<
      SuppressViolationApiResponse,
      SuppressViolationApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/${queryArg.violationId}/suppress`,
        method: 'POST',
      }),
    }),
    listReportSchedules: build.query<
      ListReportSchedulesApiResponse,
      ListReportSchedulesApiArg
    >({
      query: (queryArg) => ({
        url: `/report-schedules`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          report_id: queryArg.reportId,
          page: queryArg.page,
          type: queryArg['type'],
        },
      }),
    }),
    createReportSchedule: build.mutation<
      CreateReportScheduleApiResponse,
      CreateReportScheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/report-schedules`,
        method: 'POST',
        body: queryArg.createReportSchedule,
      }),
    }),
    getViolation: build.query<GetViolationApiResponse, GetViolationApiArg>({
      query: (queryArg) => ({ url: `/violations/${queryArg.violationId}` }),
    }),
    getViolationComments: build.query<
      GetViolationCommentsApiResponse,
      GetViolationCommentsApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/${queryArg.violationId}/comments`,
      }),
    }),
    createViolationComment: build.mutation<
      CreateViolationCommentApiResponse,
      CreateViolationCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/${queryArg.violationId}/comments`,
        method: 'POST',
        body: queryArg.createViolationComment,
      }),
    }),
    getControlAncestry: build.query<
      GetControlAncestryApiResponse,
      GetControlAncestryApiArg
    >({
      query: (queryArg) => ({
        url: `/compliance-controls/${queryArg.controlId}/ancestry`,
      }),
    }),
    unsubscribePolicy: build.mutation<
      UnsubscribePolicyApiResponse,
      UnsubscribePolicyApiArg
    >({
      query: (queryArg) => ({
        url: `/policies/${queryArg.policyId}/unsubscribe`,
        method: 'POST',
      }),
    }),
    unsuppressViolations: build.mutation<
      UnsuppressViolationsApiResponse,
      UnsuppressViolationsApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/unsuppress`,
        method: 'POST',
        body: queryArg.idList,
      }),
    }),
    verifyIntegration: build.mutation<
      VerifyIntegrationApiResponse,
      VerifyIntegrationApiArg
    >({
      query: (queryArg) => ({
        url: `/integrations/${queryArg.integrationId}/verify`,
        method: 'POST',
      }),
    }),
    subscribePolicy: build.mutation<
      SubscribePolicyApiResponse,
      SubscribePolicyApiArg
    >({
      query: (queryArg) => ({
        url: `/policies/${queryArg.policyId}/subscribe`,
        method: 'POST',
      }),
    }),
    scanDatasources: build.mutation<
      ScanDatasourcesApiResponse,
      ScanDatasourcesApiArg
    >({
      query: (queryArg) => ({
        url: `/datasources/scan`,
        method: 'POST',
        body: queryArg.idList,
      }),
    }),
    getRole: build.query<GetRoleApiResponse, GetRoleApiArg>({
      query: (queryArg) => ({ url: `/roles/${queryArg.roleId}` }),
    }),
    updateRole: build.mutation<UpdateRoleApiResponse, UpdateRoleApiArg>({
      query: (queryArg) => ({
        url: `/roles/${queryArg.roleId}`,
        method: 'PUT',
        body: queryArg.updateRole,
      }),
    }),
    deleteRole: build.mutation<DeleteRoleApiResponse, DeleteRoleApiArg>({
      query: (queryArg) => ({
        url: `/roles/${queryArg.roleId}`,
        method: 'DELETE',
      }),
    }),
    enableWorkflow: build.mutation<
      EnableWorkflowApiResponse,
      EnableWorkflowApiArg
    >({
      query: (queryArg) => ({
        url: `/workflows/${queryArg.workflowId}/enable`,
        method: 'POST',
      }),
    }),
    createSignedUrl: build.mutation<
      CreateSignedUrlApiResponse,
      CreateSignedUrlApiArg
    >({
      query: (queryArg) => ({
        url: `/report-schedules/create-signed-url`,
        method: 'POST',
        body: queryArg.createSignedUrl,
      }),
    }),
    requestPoliciesCsv: build.mutation<
      RequestPoliciesCsvApiResponse,
      RequestPoliciesCsvApiArg
    >({
      query: (queryArg) => ({
        url: `/policies/csv`,
        method: 'POST',
        params: {
          only_failed: queryArg.onlyFailed,
          tag: queryArg.tag,
          name: queryArg.name,
          severity_label: queryArg.severityLabel,
          secberus_managed: queryArg.secberusManaged,
          datasource_type: queryArg.datasourceType,
          category_id: queryArg.categoryId,
          resource_data: queryArg.resourceData,
          compliance_id: queryArg.complianceId,
          datasource_id: queryArg.datasourceId,
          resource_id: queryArg.resourceId,
          category_type: queryArg.categoryType,
          subscribed: queryArg.subscribed,
        },
      }),
    }),
    getAccountMeta: build.query<
      GetAccountMetaApiResponse,
      GetAccountMetaApiArg
    >({
      query: () => ({ url: `/account` }),
    }),
    listDatasourcesStatus: build.query<
      ListDatasourcesStatusApiResponse,
      ListDatasourcesStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/datasources/status`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
          datasource_type: queryArg.datasourceType,
        },
      }),
    }),
    reinviteUser: build.mutation<ReinviteUserApiResponse, ReinviteUserApiArg>({
      query: (queryArg) => ({
        url: `/reinvite`,
        method: 'POST',
        body: queryArg.reinviteUser,
      }),
    }),
    getEmailCallback: build.query<
      GetEmailCallbackApiResponse,
      GetEmailCallbackApiArg
    >({
      query: (queryArg) => ({
        url: `/callbacks/email`,
        params: { state: queryArg.state },
      }),
    }),
    getComplianceFrameworksSummary: build.query<
      GetComplianceFrameworksSummaryApiResponse,
      GetComplianceFrameworksSummaryApiArg
    >({
      query: (queryArg) => ({
        url: `/compliance-frameworks/summary`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    getUser: build.query<GetUserApiResponse, GetUserApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.userid}` }),
    }),
    updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
      query: (queryArg) => ({
        url: `/users/${queryArg.userid}`,
        method: 'PUT',
        body: queryArg.updateUser,
      }),
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({
        url: `/users/${queryArg.userid}`,
        method: 'DELETE',
      }),
    }),
    listRoles: build.query<ListRolesApiResponse, ListRolesApiArg>({
      query: (queryArg) => ({
        url: `/roles`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    createRole: build.mutation<CreateRoleApiResponse, CreateRoleApiArg>({
      query: (queryArg) => ({
        url: `/roles`,
        method: 'POST',
        body: queryArg.createRole,
      }),
    }),
    githubGenerateState: build.mutation<
      GithubGenerateStateApiResponse,
      GithubGenerateStateApiArg
    >({
      query: () => ({ url: `/github/generateState`, method: 'POST' }),
    }),
    getOrg: build.query<GetOrgApiResponse, GetOrgApiArg>({
      query: (queryArg) => ({ url: `/orgs/${queryArg.orgid}` }),
    }),
    updateOrg: build.mutation<UpdateOrgApiResponse, UpdateOrgApiArg>({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.orgid}`,
        method: 'PUT',
        body: queryArg.createOrg,
      }),
    }),
    deleteOrg: build.mutation<DeleteOrgApiResponse, DeleteOrgApiArg>({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.orgid}`,
        method: 'DELETE',
      }),
    }),
    listAccessPolicies: build.query<
      ListAccessPoliciesApiResponse,
      ListAccessPoliciesApiArg
    >({
      query: (queryArg) => ({
        url: `/access-policies`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    createAccessPolicy: build.mutation<
      CreateAccessPolicyApiResponse,
      CreateAccessPolicyApiArg
    >({
      query: (queryArg) => ({
        url: `/access-policies`,
        method: 'POST',
        body: queryArg.createAccessPolicy,
      }),
    }),
    deleteSsoProvider: build.mutation<
      DeleteSsoProviderApiResponse,
      DeleteSsoProviderApiArg
    >({
      query: (queryArg) => ({
        url: `/accounts/sso/${queryArg.providerName}`,
        method: 'DELETE',
      }),
    }),
    getResource: build.query<GetResourceApiResponse, GetResourceApiArg>({
      query: (queryArg) => ({ url: `/resources/${queryArg.resourceid}` }),
    }),
    getComplianceFrameworkCompliance: build.query<
      GetComplianceFrameworkComplianceApiResponse,
      GetComplianceFrameworkComplianceApiArg
    >({
      query: (queryArg) => ({
        url: `/compliance-frameworks/${queryArg.frameworkId}/compliance`,
        params: {
          resource_data: queryArg.resourceData,
          datasource_id: queryArg.datasourceId,
          resource_id: queryArg.resourceId,
          datasource_type: queryArg.datasourceType,
        },
      }),
    }),
    getOrgUsers: build.query<GetOrgUsersApiResponse, GetOrgUsersApiArg>({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.orgid}/users`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    getSplunk: build.query<GetSplunkApiResponse, GetSplunkApiArg>({
      query: () => ({ url: `/integrations/splunk` }),
    }),
    createSplunk: build.mutation<CreateSplunkApiResponse, CreateSplunkApiArg>({
      query: (queryArg) => ({
        url: `/integrations/splunk`,
        method: 'POST',
        body: queryArg.createSplunk,
      }),
    }),
    getViolationSeveritySummary: build.query<
      GetViolationSeveritySummaryApiResponse,
      GetViolationSeveritySummaryApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/severity-summary`,
        params: {
          tag: queryArg.tag,
          policy_id: queryArg.policyId,
          status: queryArg.status,
          not_before: queryArg.notBefore,
          datasource_type: queryArg.datasourceType,
          category_id: queryArg.categoryId,
          resource_data: queryArg.resourceData,
          compliance_id: queryArg.complianceId,
          datasource_id: queryArg.datasourceId,
          suppressed: queryArg.suppressed,
          resource_id: queryArg.resourceId,
          category_name: queryArg.categoryName,
          severity: queryArg.severity,
          not_after: queryArg.notAfter,
        },
      }),
    }),
    listPolicies: build.query<ListPoliciesApiResponse, ListPoliciesApiArg>({
      query: (queryArg) => ({
        url: `/policies`,
        params: {
          only_failed: queryArg.onlyFailed,
          sort_by: queryArg.sortBy,
          tag: queryArg.tag,
          name: queryArg.name,
          severity_label: queryArg.severityLabel,
          secberus_managed: queryArg.secberusManaged,
          datasource_type: queryArg.datasourceType,
          category_id: queryArg.categoryId,
          resource_data: queryArg.resourceData,
          compliance_id: queryArg.complianceId,
          datasource_id: queryArg.datasourceId,
          limit: queryArg.limit,
          resource_id: queryArg.resourceId,
          category_type: queryArg.categoryType,
          page: queryArg.page,
          subscribed: queryArg.subscribed,
        },
      }),
    }),
    createPolicy: build.mutation<CreatePolicyApiResponse, CreatePolicyApiArg>({
      query: (queryArg) => ({
        url: `/policies`,
        method: 'POST',
        body: queryArg.policy,
      }),
    }),
    closeViolations: build.mutation<
      CloseViolationsApiResponse,
      CloseViolationsApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/close`,
        method: 'POST',
        params: { policy_id: queryArg.policyId },
      }),
    }),
    summarizePolicies: build.query<
      SummarizePoliciesApiResponse,
      SummarizePoliciesApiArg
    >({
      query: () => ({ url: `/policies/summary` }),
    }),
    getPolicy: build.query<GetPolicyApiResponse, GetPolicyApiArg>({
      query: (queryArg) => ({ url: `/policies/${queryArg.policyId}` }),
    }),
    updatePolicy: build.mutation<UpdatePolicyApiResponse, UpdatePolicyApiArg>({
      query: (queryArg) => ({
        url: `/policies/${queryArg.policyId}`,
        method: 'PUT',
        body: queryArg.policy,
      }),
    }),
    deletePolicy: build.mutation<DeletePolicyApiResponse, DeletePolicyApiArg>({
      query: (queryArg) => ({
        url: `/policies/${queryArg.policyId}`,
        method: 'DELETE',
      }),
    }),
    unsubscribePoliciesBulk: build.mutation<
      UnsubscribePoliciesBulkApiResponse,
      UnsubscribePoliciesBulkApiArg
    >({
      query: (queryArg) => ({
        url: `/policies/unsubscribe`,
        method: 'POST',
        body: queryArg.idList,
      }),
    }),
    getSsoConfig: build.query<GetSsoConfigApiResponse, GetSsoConfigApiArg>({
      query: (queryArg) => ({
        url: `/login/is-sso`,
        params: { email: queryArg.email },
      }),
    }),
    markViolationOpen: build.mutation<
      MarkViolationOpenApiResponse,
      MarkViolationOpenApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/${queryArg.violationId}/mark-open`,
        method: 'POST',
      }),
    }),
    listPolicyComplianceControls: build.query<
      ListPolicyComplianceControlsApiResponse,
      ListPolicyComplianceControlsApiArg
    >({
      query: (queryArg) => ({
        url: `/policies/${queryArg.policyId}/compliance-controls`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    updatePolicyComplianceControls: build.mutation<
      UpdatePolicyComplianceControlsApiResponse,
      UpdatePolicyComplianceControlsApiArg
    >({
      query: (queryArg) => ({
        url: `/policies/${queryArg.policyId}/compliance-controls`,
        method: 'PUT',
        body: queryArg.idList,
      }),
    }),
    runPolicy: build.mutation<RunPolicyApiResponse, RunPolicyApiArg>({
      query: (queryArg) => ({
        url: `/policy/${queryArg.policyId}/run/${queryArg.datasourceId}`,
        method: 'POST',
      }),
    }),
    deleteSumoLogic: build.mutation<
      DeleteSumoLogicApiResponse,
      DeleteSumoLogicApiArg
    >({
      query: (queryArg) => ({
        url: `/integrations/sumologic/${queryArg.integrationId}`,
        method: 'DELETE',
      }),
    }),
    getDatasourceResources: build.query<
      GetDatasourceResourcesApiResponse,
      GetDatasourceResourcesApiArg
    >({
      query: (queryArg) => ({
        url: `/datasources/${queryArg.datasourceId}/resources`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
          datasource_type: queryArg.datasourceType,
        },
      }),
    }),
    listPolicyIds: build.query<ListPolicyIdsApiResponse, ListPolicyIdsApiArg>({
      query: (queryArg) => ({
        url: `/policies/ids`,
        params: {
          only_failed: queryArg.onlyFailed,
          sort_by: queryArg.sortBy,
          tag: queryArg.tag,
          name: queryArg.name,
          severity_label: queryArg.severityLabel,
          secberus_managed: queryArg.secberusManaged,
          datasource_type: queryArg.datasourceType,
          category_id: queryArg.categoryId,
          resource_data: queryArg.resourceData,
          compliance_id: queryArg.complianceId,
          datasource_id: queryArg.datasourceId,
          limit: queryArg.limit,
          resource_id: queryArg.resourceId,
          category_type: queryArg.categoryType,
          page: queryArg.page,
          subscribed: queryArg.subscribed,
        },
      }),
    }),
    postLoginOldrinTest: build.mutation<
      PostLoginOldrinTestApiResponse,
      PostLoginOldrinTestApiArg
    >({
      query: () => ({ url: `/login/oldrin-test`, method: 'POST' }),
    }),
    getDatasource: build.query<GetDatasourceApiResponse, GetDatasourceApiArg>({
      query: (queryArg) => ({ url: `/datasources/${queryArg.datasourceId}` }),
    }),
    updateDatasource: build.mutation<
      UpdateDatasourceApiResponse,
      UpdateDatasourceApiArg
    >({
      query: (queryArg) => ({
        url: `/datasources/${queryArg.datasourceId}`,
        method: 'PUT',
        body: queryArg.datasource,
      }),
    }),
    deleteDatasource: build.mutation<
      DeleteDatasourceApiResponse,
      DeleteDatasourceApiArg
    >({
      query: (queryArg) => ({
        url: `/datasources/${queryArg.datasourceId}`,
        method: 'DELETE',
      }),
    }),
    subscribePoliciesBulk: build.mutation<
      SubscribePoliciesBulkApiResponse,
      SubscribePoliciesBulkApiArg
    >({
      query: (queryArg) => ({
        url: `/policies/subscribe`,
        method: 'POST',
        body: queryArg.idList,
      }),
    }),
    getComplianceFramework: build.query<
      GetComplianceFrameworkApiResponse,
      GetComplianceFrameworkApiArg
    >({
      query: (queryArg) => ({
        url: `/compliance-frameworks/${queryArg.frameworkId}`,
      }),
    }),
    toggleFramework: build.mutation<
      ToggleFrameworkApiResponse,
      ToggleFrameworkApiArg
    >({
      query: (queryArg) => ({
        url: `/compliance-frameworks/${queryArg.frameworkId}`,
        method: 'PATCH',
        body: queryArg.complianceFrameworkPatch,
      }),
    }),
    listPolicyDatasources: build.query<
      ListPolicyDatasourcesApiResponse,
      ListPolicyDatasourcesApiArg
    >({
      query: (queryArg) => ({
        url: `/policies/${queryArg.policyId}/datasources`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    updatePolicyDatasources: build.mutation<
      UpdatePolicyDatasourcesApiResponse,
      UpdatePolicyDatasourcesApiArg
    >({
      query: (queryArg) => ({
        url: `/policies/${queryArg.policyId}/datasources`,
        method: 'PUT',
        body: queryArg.policyDatasourceIds,
      }),
    }),
    requestCsvExport: build.mutation<
      RequestCsvExportApiResponse,
      RequestCsvExportApiArg
    >({
      query: (queryArg) => ({
        url: `/compliance-frameworks/${queryArg.frameworkId}/compliance/csv`,
        method: 'POST',
        params: {
          resource_data: queryArg.resourceData,
          datasource_id: queryArg.datasourceId,
          resource_id: queryArg.resourceId,
          datasource_type: queryArg.datasourceType,
        },
      }),
    }),
    getCategory: build.query<GetCategoryApiResponse, GetCategoryApiArg>({
      query: (queryArg) => ({ url: `/categories/${queryArg.categoryId}` }),
    }),
    updateCategory: build.mutation<
      UpdateCategoryApiResponse,
      UpdateCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.categoryId}`,
        method: 'PUT',
        body: queryArg.policyCategory,
      }),
    }),
    deleteCategory: build.mutation<
      DeleteCategoryApiResponse,
      DeleteCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.categoryId}`,
        method: 'DELETE',
        params: { replacement_category_id: queryArg.replacementCategoryId },
      }),
    }),
    postTfcByTfcId: build.mutation<
      PostTfcByTfcIdApiResponse,
      PostTfcByTfcIdApiArg
    >({
      query: (queryArg) => ({ url: `/tfc/${queryArg.tfcId}`, method: 'POST' }),
    }),
    listOrgs: build.query<ListOrgsApiResponse, ListOrgsApiArg>({
      query: (queryArg) => ({
        url: `/orgs`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    createOrg: build.mutation<CreateOrgApiResponse, CreateOrgApiArg>({
      query: (queryArg) => ({
        url: `/orgs`,
        method: 'POST',
        body: queryArg.createOrg,
      }),
    }),
    computeControlCompliance: build.query<
      ComputeControlComplianceApiResponse,
      ComputeControlComplianceApiArg
    >({
      query: (queryArg) => ({
        url: `/compliance-controls/${queryArg.controlId}/compliance`,
        params: {
          resource_data: queryArg.resourceData,
          datasource_id: queryArg.datasourceId,
          resource_id: queryArg.resourceId,
          datasource_type: queryArg.datasourceType,
        },
      }),
    }),
    suppressViolations: build.mutation<
      SuppressViolationsApiResponse,
      SuppressViolationsApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/suppress`,
        method: 'POST',
        body: queryArg.idList,
      }),
    }),
    listIntegrations: build.query<
      ListIntegrationsApiResponse,
      ListIntegrationsApiArg
    >({
      query: (queryArg) => ({
        url: `/integrations`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
          integration_id: queryArg.integrationId,
          type: queryArg['type'],
        },
      }),
    }),
    createIntegration: build.mutation<
      CreateIntegrationApiResponse,
      CreateIntegrationApiArg
    >({
      query: (queryArg) => ({
        url: `/integrations`,
        method: 'POST',
        body: queryArg.createIntegration,
      }),
    }),
    getServiceNowCallback: build.query<
      GetServiceNowCallbackApiResponse,
      GetServiceNowCallbackApiArg
    >({
      query: (queryArg) => ({
        url: `/callbacks/servicenow`,
        params: { state: queryArg.state, code: queryArg.code },
      }),
    }),
    postGithubWebhook: build.mutation<
      PostGithubWebhookApiResponse,
      PostGithubWebhookApiArg
    >({
      query: () => ({ url: `/github/webhook`, method: 'POST' }),
    }),
    authorizeIntegration: build.mutation<
      AuthorizeIntegrationApiResponse,
      AuthorizeIntegrationApiArg
    >({
      query: (queryArg) => ({
        url: `/integrations/${queryArg.integrationId}/authorize`,
        method: 'POST',
      }),
    }),
    setUserRoles: build.mutation<SetUserRolesApiResponse, SetUserRolesApiArg>({
      query: (queryArg) => ({
        url: `/users/${queryArg.userid}/${queryArg.orgId}/roles`,
        method: 'PUT',
        body: queryArg.idList,
      }),
    }),
    addUserRoles: build.mutation<AddUserRolesApiResponse, AddUserRolesApiArg>({
      query: (queryArg) => ({
        url: `/users/${queryArg.userid}/${queryArg.orgId}/roles`,
        method: 'POST',
        body: queryArg.idList,
      }),
    }),
    removeUserRoles: build.mutation<
      RemoveUserRolesApiResponse,
      RemoveUserRolesApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.userid}/${queryArg.orgId}/roles`,
        method: 'DELETE',
        body: queryArg.idList,
      }),
    }),
    getSumoLogic: build.query<GetSumoLogicApiResponse, GetSumoLogicApiArg>({
      query: () => ({ url: `/integrations/sumologic` }),
    }),
    createSumoLogic: build.mutation<
      CreateSumoLogicApiResponse,
      CreateSumoLogicApiArg
    >({
      query: (queryArg) => ({
        url: `/integrations/sumologic`,
        method: 'POST',
        body: queryArg.createSumoLogic,
      }),
    }),
    getDatasourceSummary: build.query<
      GetDatasourceSummaryApiResponse,
      GetDatasourceSummaryApiArg
    >({
      query: () => ({ url: `/datasources/overview` }),
    }),
    getMetric: build.query<GetMetricApiResponse, GetMetricApiArg>({
      query: (queryArg) => ({
        url: `/metrics/${queryArg.name}`,
        params: {
          limit: queryArg.limit,
          service: queryArg.service,
          start_time: queryArg.startTime,
          end_time: queryArg.endTime,
        },
      }),
    }),
    getSsoDetails: build.query<GetSsoDetailsApiResponse, GetSsoDetailsApiArg>({
      query: () => ({ url: `/accounts/sso/details` }),
    }),
    markViolationFixed: build.mutation<
      MarkViolationFixedApiResponse,
      MarkViolationFixedApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/${queryArg.violationId}/mark-fixed`,
        method: 'POST',
      }),
    }),
    getLogs: build.query<GetLogsApiResponse, GetLogsApiArg>({
      query: (queryArg) => ({
        url: `/logs`,
        params: {
          sort_by: queryArg.sortBy,
          start_time: queryArg.startTime,
          before: queryArg.before,
          after: queryArg.after,
          q: queryArg.q,
          end_time: queryArg.endTime,
        },
      }),
    }),
    getViolationCountPerPolicies: build.mutation<
      GetViolationCountPerPoliciesApiResponse,
      GetViolationCountPerPoliciesApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/policies-violation-count`,
        method: 'POST',
        body: queryArg.policyIdList,
      }),
    }),
    getControlPolicies: build.query<
      GetControlPoliciesApiResponse,
      GetControlPoliciesApiArg
    >({
      query: (queryArg) => ({
        url: `/compliance-controls/${queryArg.controlId}/policies`,
      }),
    }),
    switchOrg: build.mutation<SwitchOrgApiResponse, SwitchOrgApiArg>({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.orgid}/switch`,
        method: 'PUT',
      }),
    }),
    getViolations: build.query<GetViolationsApiResponse, GetViolationsApiArg>({
      query: (queryArg) => ({
        url: `/violations`,
        params: {
          sort_by: queryArg.sortBy,
          tag: queryArg.tag,
          policy_id: queryArg.policyId,
          status: queryArg.status,
          not_before: queryArg.notBefore,
          datasource_type: queryArg.datasourceType,
          category_id: queryArg.categoryId,
          resource_data: queryArg.resourceData,
          compliance_id: queryArg.complianceId,
          datasource_id: queryArg.datasourceId,
          suppressed: queryArg.suppressed,
          limit: queryArg.limit,
          resource_id: queryArg.resourceId,
          category_name: queryArg.categoryName,
          severity: queryArg.severity,
          not_after: queryArg.notAfter,
          page: queryArg.page,
        },
      }),
    }),
    getException: build.query<GetExceptionApiResponse, GetExceptionApiArg>({
      query: (queryArg) => ({ url: `/exceptions/${queryArg.exceptionId}` }),
    }),
    updateException: build.mutation<
      UpdateExceptionApiResponse,
      UpdateExceptionApiArg
    >({
      query: (queryArg) => ({
        url: `/exceptions/${queryArg.exceptionId}`,
        method: 'PUT',
        body: queryArg.updateException,
      }),
    }),
    deleteException: build.mutation<
      DeleteExceptionApiResponse,
      DeleteExceptionApiArg
    >({
      query: (queryArg) => ({
        url: `/exceptions/${queryArg.exceptionId}`,
        method: 'DELETE',
      }),
    }),
    listResources: build.query<ListResourcesApiResponse, ListResourcesApiArg>({
      query: (queryArg) => ({
        url: `/resources`,
        params: { datasource_type: queryArg.datasourceType },
      }),
    }),
    listWorkflows: build.query<ListWorkflowsApiResponse, ListWorkflowsApiArg>({
      query: (queryArg) => ({
        url: `/workflows`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    createWorkflow: build.mutation<
      CreateWorkflowApiResponse,
      CreateWorkflowApiArg
    >({
      query: (queryArg) => ({
        url: `/workflows`,
        method: 'POST',
        body: queryArg.workflow,
      }),
    }),
    requestPolicyViolationsCsv: build.mutation<
      RequestPolicyViolationsCsvApiResponse,
      RequestPolicyViolationsCsvApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/policy-csv`,
        method: 'POST',
        params: {
          tag: queryArg.tag,
          policy_id: queryArg.policyId,
          status: queryArg.status,
          not_before: queryArg.notBefore,
          datasource_type: queryArg.datasourceType,
          category_id: queryArg.categoryId,
          resource_data: queryArg.resourceData,
          compliance_id: queryArg.complianceId,
          datasource_id: queryArg.datasourceId,
          suppressed: queryArg.suppressed,
          resource_id: queryArg.resourceId,
          category_name: queryArg.categoryName,
          severity: queryArg.severity,
          not_after: queryArg.notAfter,
        },
      }),
    }),
    listDatasources: build.query<
      ListDatasourcesApiResponse,
      ListDatasourcesApiArg
    >({
      query: (queryArg) => ({
        url: `/datasources`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
          datasource_type: queryArg.datasourceType,
        },
      }),
    }),
    createDatasource: build.mutation<
      CreateDatasourceApiResponse,
      CreateDatasourceApiArg
    >({
      query: (queryArg) => ({
        url: `/datasources`,
        method: 'POST',
        body: queryArg.datasource,
      }),
    }),
    getIntegration: build.query<
      GetIntegrationApiResponse,
      GetIntegrationApiArg
    >({
      query: (queryArg) => ({ url: `/integrations/${queryArg.integrationId}` }),
    }),
    updateIntegration: build.mutation<
      UpdateIntegrationApiResponse,
      UpdateIntegrationApiArg
    >({
      query: (queryArg) => ({
        url: `/integrations/${queryArg.integrationId}`,
        method: 'PUT',
        body: queryArg.updateIntegration,
      }),
    }),
    deleteIntegration: build.mutation<
      DeleteIntegrationApiResponse,
      DeleteIntegrationApiArg
    >({
      query: (queryArg) => ({
        url: `/integrations/${queryArg.integrationId}`,
        method: 'DELETE',
      }),
    }),
    githubInstallation: build.mutation<
      GithubInstallationApiResponse,
      GithubInstallationApiArg
    >({
      query: (queryArg) => ({
        url: `/github/installation`,
        method: 'POST',
        body: queryArg.githubInstallationRequest,
      }),
    }),
    getRiskPosture: build.mutation<
      GetRiskPostureApiResponse,
      GetRiskPostureApiArg
    >({
      query: (queryArg) => ({
        url: `/risk-posture`,
        method: 'POST',
        body: queryArg.riskPostureParams,
      }),
    }),
    getReportingEmailCallback: build.query<
      GetReportingEmailCallbackApiResponse,
      GetReportingEmailCallbackApiArg
    >({
      query: (queryArg) => ({
        url: `/callbacks/reporting`,
        params: { state: queryArg.state },
      }),
    }),
    tallyViolations: build.mutation<
      TallyViolationsApiResponse,
      TallyViolationsApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/tally`,
        method: 'POST',
        params: {
          tag: queryArg.tag,
          policy_id: queryArg.policyId,
          status: queryArg.status,
          not_before: queryArg.notBefore,
          datasource_type: queryArg.datasourceType,
          category_id: queryArg.categoryId,
          resource_data: queryArg.resourceData,
          compliance_id: queryArg.complianceId,
          datasource_id: queryArg.datasourceId,
          suppressed: queryArg.suppressed,
          resource_id: queryArg.resourceId,
          category_name: queryArg.categoryName,
          severity: queryArg.severity,
          not_after: queryArg.notAfter,
        },
      }),
    }),
    createTfcRunTaskIntegration: build.mutation<
      CreateTfcRunTaskIntegrationApiResponse,
      CreateTfcRunTaskIntegrationApiArg
    >({
      query: (queryArg) => ({
        url: `/tfc`,
        method: 'POST',
        body: queryArg.tfcRunTaskIntegration,
      }),
    }),
    getUserOrgs: build.query<GetUserOrgsApiResponse, GetUserOrgsApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.userid}/orgs` }),
    }),
    disableWorkflow: build.mutation<
      DisableWorkflowApiResponse,
      DisableWorkflowApiArg
    >({
      query: (queryArg) => ({
        url: `/workflows/${queryArg.workflowId}/disable`,
        method: 'POST',
      }),
    }),
    requestViolationsCsv: build.mutation<
      RequestViolationsCsvApiResponse,
      RequestViolationsCsvApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/csv`,
        method: 'POST',
        params: {
          sort_by: queryArg.sortBy,
          tag: queryArg.tag,
          policy_id: queryArg.policyId,
          status: queryArg.status,
          not_before: queryArg.notBefore,
          datasource_type: queryArg.datasourceType,
          category_id: queryArg.categoryId,
          resource_data: queryArg.resourceData,
          compliance_id: queryArg.complianceId,
          datasource_id: queryArg.datasourceId,
          suppressed: queryArg.suppressed,
          limit: queryArg.limit,
          resource_id: queryArg.resourceId,
          category_name: queryArg.categoryName,
          severity: queryArg.severity,
          not_after: queryArg.notAfter,
          page: queryArg.page,
        },
      }),
    }),
    getAccessPolicy: build.query<
      GetAccessPolicyApiResponse,
      GetAccessPolicyApiArg
    >({
      query: (queryArg) => ({
        url: `/access-policies/${queryArg.accessPolicyId}`,
      }),
    }),
    updateAccessPolicy: build.mutation<
      UpdateAccessPolicyApiResponse,
      UpdateAccessPolicyApiArg
    >({
      query: (queryArg) => ({
        url: `/access-policies/${queryArg.accessPolicyId}`,
        method: 'PUT',
        body: queryArg.updateAccessPolicy,
      }),
    }),
    deleteAccessPolicy: build.mutation<
      DeleteAccessPolicyApiResponse,
      DeleteAccessPolicyApiArg
    >({
      query: (queryArg) => ({
        url: `/access-policies/${queryArg.accessPolicyId}`,
        method: 'DELETE',
      }),
    }),
    binViolations: build.mutation<
      BinViolationsApiResponse,
      BinViolationsApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/bin`,
        method: 'POST',
        params: {
          tag: queryArg.tag,
          policy_id: queryArg.policyId,
          status: queryArg.status,
          not_before: queryArg.notBefore,
          datasource_type: queryArg.datasourceType,
          category_id: queryArg.categoryId,
          resource_data: queryArg.resourceData,
          compliance_id: queryArg.complianceId,
          datasource_id: queryArg.datasourceId,
          suppressed: queryArg.suppressed,
          resource_id: queryArg.resourceId,
          category_name: queryArg.categoryName,
          severity: queryArg.severity,
          not_after: queryArg.notAfter,
        },
      }),
    }),
    unsuppressViolation: build.mutation<
      UnsuppressViolationApiResponse,
      UnsuppressViolationApiArg
    >({
      query: (queryArg) => ({
        url: `/violations/${queryArg.violationId}/unsuppress`,
        method: 'POST',
      }),
    }),
    sendVerification: build.mutation<
      SendVerificationApiResponse,
      SendVerificationApiArg
    >({
      query: (queryArg) => ({
        url: `/verification/email`,
        method: 'POST',
        body: queryArg.sendVerification,
      }),
    }),
    getAuthToken: build.mutation<GetAuthTokenApiResponse, GetAuthTokenApiArg>({
      query: (queryArg) => ({
        url: `/login/token`,
        method: 'POST',
        body: queryArg.credentialLogin,
      }),
    }),
    getWorkflow: build.query<GetWorkflowApiResponse, GetWorkflowApiArg>({
      query: (queryArg) => ({ url: `/workflows/${queryArg.workflowId}` }),
    }),
    updateWorkflow: build.mutation<
      UpdateWorkflowApiResponse,
      UpdateWorkflowApiArg
    >({
      query: (queryArg) => ({
        url: `/workflows/${queryArg.workflowId}`,
        method: 'PUT',
        body: queryArg.workflow,
      }),
    }),
    deleteWorkflow: build.mutation<
      DeleteWorkflowApiResponse,
      DeleteWorkflowApiArg
    >({
      query: (queryArg) => ({
        url: `/workflows/${queryArg.workflowId}`,
        method: 'DELETE',
      }),
    }),
    listCategories: build.query<
      ListCategoriesApiResponse,
      ListCategoriesApiArg
    >({
      query: (queryArg) => ({
        url: `/categories`,
        params: {
          sort_by: queryArg.sortBy,
          category_type: queryArg.categoryType,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    createCategory: build.mutation<
      CreateCategoryApiResponse,
      CreateCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/categories`,
        method: 'POST',
        body: queryArg.policyCategory,
      }),
    }),
    getSelf: build.query<GetSelfApiResponse, GetSelfApiArg>({
      query: () => ({ url: `/users/self` }),
    }),
    updateSelf: build.mutation<UpdateSelfApiResponse, UpdateSelfApiArg>({
      query: (queryArg) => ({
        url: `/users/self`,
        method: 'PUT',
        body: queryArg.updateSelf,
      }),
    }),
    listExceptions: build.query<
      ListExceptionsApiResponse,
      ListExceptionsApiArg
    >({
      query: (queryArg) => ({
        url: `/exceptions`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    createException: build.mutation<
      CreateExceptionApiResponse,
      CreateExceptionApiArg
    >({
      query: (queryArg) => ({
        url: `/exceptions`,
        method: 'POST',
        body: queryArg.createException,
      }),
    }),
    testPolicy: build.mutation<TestPolicyApiResponse, TestPolicyApiArg>({
      query: (queryArg) => ({
        url: `/test-policy`,
        method: 'POST',
        body: queryArg.testPolicy,
      }),
    }),
    getReportSchedule: build.query<
      GetReportScheduleApiResponse,
      GetReportScheduleApiArg
    >({
      query: (queryArg) => ({ url: `/report-schedules/${queryArg.reportId}` }),
    }),
    updateReportSchedule: build.mutation<
      UpdateReportScheduleApiResponse,
      UpdateReportScheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/report-schedules/${queryArg.reportId}`,
        method: 'PUT',
        body: queryArg.updateReportSchedule,
      }),
    }),
    deleteReportSchedule: build.mutation<
      DeleteReportScheduleApiResponse,
      DeleteReportScheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/report-schedules/${queryArg.reportId}`,
        method: 'DELETE',
      }),
    }),
    listDatasourceTypes: build.query<
      ListDatasourceTypesApiResponse,
      ListDatasourceTypesApiArg
    >({
      query: () => ({ url: `/datasource-types` }),
    }),
    listUsers: build.query<ListUsersApiResponse, ListUsersApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        params: {
          term: queryArg.term,
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        method: 'POST',
        body: queryArg.createUser,
      }),
    }),
    generateReport: build.mutation<
      GenerateReportApiResponse,
      GenerateReportApiArg
    >({
      query: (queryArg) => ({
        url: `/integrations/${queryArg.integrationId}/generate-report/${queryArg.reportType}`,
        method: 'POST',
      }),
    }),
    listPolicyExceptions: build.query<
      ListPolicyExceptionsApiResponse,
      ListPolicyExceptionsApiArg
    >({
      query: (queryArg) => ({
        url: `/exceptions/policy/${queryArg.policyId}`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    deleteSplunk: build.mutation<DeleteSplunkApiResponse, DeleteSplunkApiArg>({
      query: (queryArg) => ({
        url: `/integrations/splunk/${queryArg.integrationId}`,
        method: 'DELETE',
      }),
    }),
    getComplianceControl: build.query<
      GetComplianceControlApiResponse,
      GetComplianceControlApiArg
    >({
      query: (queryArg) => ({
        url: `/compliance-controls/${queryArg.controlId}`,
      }),
    }),
    listDatasourcesByRisk: build.query<
      ListDatasourcesByRiskApiResponse,
      ListDatasourcesByRiskApiArg
    >({
      query: () => ({ url: `/datasources/risk` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as secberusApiGW };
export type ListSsoProvidersApiResponse =
  /** status 200 200 response */ EmptySchema;
export type ListSsoProvidersApiArg = void;
export type CreateSsoProviderApiResponse =
  /** status 200 200 response */ SsoDetails;
export type CreateSsoProviderApiArg = {
  addSsoProvider: AddSsoProvider;
};
export type GetComplianceFrameworksApiResponse =
  /** status 200 200 response */ ComplianceFrameworkList;
export type GetComplianceFrameworksApiArg = {
  enabled?: string;
};
export type SetEnabledFrameworksApiResponse =
  /** status 200 200 response */ EmptySchema;
export type SetEnabledFrameworksApiArg = {
  idList: IdList;
};
export type SuppressViolationApiResponse =
  /** status 200 200 response */ Violation;
export type SuppressViolationApiArg = {
  violationId: string;
};
export type ListReportSchedulesApiResponse =
  /** status 200 200 response */ ReportScheduleList;
export type ListReportSchedulesApiArg = {
  sortBy?: string;
  limit?: string;
  reportId?: string;
  page?: string;
  type?: string;
};
export type CreateReportScheduleApiResponse =
  /** status 200 200 response */ ReportSchedule;
export type CreateReportScheduleApiArg = {
  createReportSchedule: CreateReportSchedule;
};
export type GetViolationApiResponse = /** status 200 200 response */ Violation;
export type GetViolationApiArg = {
  violationId: string;
};
export type GetViolationCommentsApiResponse =
  /** status 200 200 response */ ViolationCommentList;
export type GetViolationCommentsApiArg = {
  violationId: string;
};
export type CreateViolationCommentApiResponse =
  /** status 200 200 response */ ViolationComment;
export type CreateViolationCommentApiArg = {
  violationId: string;
  createViolationComment: CreateViolationComment;
};
export type GetControlAncestryApiResponse =
  /** status 200 200 response */ ComplianceControlList;
export type GetControlAncestryApiArg = {
  controlId: string;
};
export type UnsubscribePolicyApiResponse =
  /** status 200 200 response */ EmptySchema;
export type UnsubscribePolicyApiArg = {
  policyId: string;
};
export type UnsuppressViolationsApiResponse =
  /** status 200 200 response */ ViolationList;
export type UnsuppressViolationsApiArg = {
  idList: IdList;
};
export type VerifyIntegrationApiResponse =
  /** status 200 200 response */ EmptySchema;
export type VerifyIntegrationApiArg = {
  integrationId: string;
};
export type SubscribePolicyApiResponse =
  /** status 200 200 response */ EmptySchema;
export type SubscribePolicyApiArg = {
  policyId: string;
};
export type ScanDatasourcesApiResponse = /** status 200 200 response */
  | string
  | /** status 202 202 response */ EmptySchema;
export type ScanDatasourcesApiArg = {
  idList: IdList;
};
export type GetRoleApiResponse = /** status 200 200 response */ AccessRole;
export type GetRoleApiArg = {
  roleId: string;
};
export type UpdateRoleApiResponse = /** status 200 200 response */ AccessRole;
export type UpdateRoleApiArg = {
  roleId: string;
  updateRole: UpdateRole;
};
export type DeleteRoleApiResponse = /** status 200 200 response */ EmptySchema;
export type DeleteRoleApiArg = {
  roleId: string;
};
export type EnableWorkflowApiResponse =
  /** status 200 200 response */ EmptySchema;
export type EnableWorkflowApiArg = {
  workflowId: string;
};
export type CreateSignedUrlApiResponse =
  /** status 200 200 response */ SignedUrl;
export type CreateSignedUrlApiArg = {
  createSignedUrl: CreateSignedUrl;
};
export type RequestPoliciesCsvApiResponse =
  /** status 200 200 response */ EmptySchema;
export type RequestPoliciesCsvApiArg = {
  onlyFailed?: string;
  tag?: string;
  name?: string;
  severityLabel?: string;
  secberusManaged?: string;
  datasourceType?: string;
  categoryId?: string;
  resourceData?: string;
  complianceId?: string;
  datasourceId?: string;
  resourceId?: string;
  categoryType?: string;
  subscribed?: string;
};
export type GetAccountMetaApiResponse = /** status 200 200 response */ Account;
export type GetAccountMetaApiArg = void;
export type ListDatasourcesStatusApiResponse =
  /** status 200 200 response */ DatasourceList;
export type ListDatasourcesStatusApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
  datasourceType?: string;
};
export type ReinviteUserApiResponse = /** status 200 200 response */ string;
export type ReinviteUserApiArg = {
  reinviteUser: ReinviteUser;
};
export type GetEmailCallbackApiResponse = /** status 200 200 response */ string;
export type GetEmailCallbackApiArg = {
  state: string;
};
export type GetComplianceFrameworksSummaryApiResponse =
  /** status 200 200 response */ ComplianceFrameworkSummaryList;
export type GetComplianceFrameworksSummaryApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
};
export type GetUserApiResponse = /** status 200 200 response */ User;
export type GetUserApiArg = {
  userid: string;
};
export type UpdateUserApiResponse = /** status 200 200 response */ User;
export type UpdateUserApiArg = {
  userid: string;
  updateUser: UpdateUser;
};
export type DeleteUserApiResponse = /** status 200 200 response */ EmptySchema;
export type DeleteUserApiArg = {
  userid: string;
};
export type ListRolesApiResponse =
  /** status 200 200 response */ AccessRoleList;
export type ListRolesApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
};
export type CreateRoleApiResponse = /** status 200 200 response */ AccessRole;
export type CreateRoleApiArg = {
  createRole: CreateRole;
};
export type GithubGenerateStateApiResponse =
  /** status 200 200 response */ GithubAppState;
export type GithubGenerateStateApiArg = void;
export type GetOrgApiResponse = /** status 200 200 response */ Org;
export type GetOrgApiArg = {
  orgid: string;
};
export type UpdateOrgApiResponse = /** status 200 200 response */ Org;
export type UpdateOrgApiArg = {
  orgid: string;
  createOrg: CreateOrg;
};
export type DeleteOrgApiResponse = /** status 200 200 response */ EmptySchema;
export type DeleteOrgApiArg = {
  orgid: string;
};
export type ListAccessPoliciesApiResponse =
  /** status 200 200 response */ AccessPolicyList;
export type ListAccessPoliciesApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
};
export type CreateAccessPolicyApiResponse =
  /** status 200 200 response */ AccessPolicy;
export type CreateAccessPolicyApiArg = {
  createAccessPolicy: CreateAccessPolicy;
};
export type DeleteSsoProviderApiResponse =
  /** status 200 200 response */ EmptySchema;
export type DeleteSsoProviderApiArg = {
  providerName: string;
};
export type GetResourceApiResponse = /** status 200 200 response */ Resource;
export type GetResourceApiArg = {
  resourceid: string;
};
export type GetComplianceFrameworkComplianceApiResponse =
  /** status 200 200 response */ ComplianceFrameworkAugmented;
export type GetComplianceFrameworkComplianceApiArg = {
  resourceData?: string;
  datasourceId?: string;
  resourceId?: string;
  datasourceType?: string;
  frameworkId: string;
};
export type GetOrgUsersApiResponse = /** status 200 200 response */ OrgUserList;
export type GetOrgUsersApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
  orgid: string;
};
export type GetSplunkApiResponse = /** status 200 200 response */ Integration;
export type GetSplunkApiArg = void;
export type CreateSplunkApiResponse =
  /** status 200 200 response */ Integration;
export type CreateSplunkApiArg = {
  createSplunk: CreateSplunk;
};
export type GetViolationSeveritySummaryApiResponse =
  /** status 200 200 response */ SeveritySummary;
export type GetViolationSeveritySummaryApiArg = {
  tag?: string;
  policyId?: string;
  status?: string;
  notBefore?: string;
  datasourceType?: string;
  categoryId?: string;
  resourceData?: string;
  complianceId?: string;
  datasourceId?: string;
  suppressed?: string;
  resourceId?: string;
  categoryName?: string;
  severity?: string;
  notAfter?: string;
};
export type ListPoliciesApiResponse = /** status 200 200 response */ PolicyList;
export type ListPoliciesApiArg = {
  onlyFailed?: string;
  sortBy?: string;
  tag?: string;
  name?: string;
  severityLabel?: string;
  secberusManaged?: string;
  datasourceType?: string;
  categoryId?: string;
  resourceData?: string;
  complianceId?: string;
  datasourceId?: string;
  limit?: string;
  resourceId?: string;
  categoryType?: string;
  page?: string;
  subscribed?: string;
};
export type CreatePolicyApiResponse = /** status 200 200 response */ Policy;
export type CreatePolicyApiArg = {
  policy: Policy;
};
export type CloseViolationsApiResponse =
  /** status 200 200 response */ EmptySchema;
export type CloseViolationsApiArg = {
  policyId: string;
};
export type SummarizePoliciesApiResponse =
  /** status 200 200 response */ PolicySummary;
export type SummarizePoliciesApiArg = void;
export type GetPolicyApiResponse = /** status 200 200 response */ Policy;
export type GetPolicyApiArg = {
  policyId: string;
};
export type UpdatePolicyApiResponse = /** status 200 200 response */ Policy;
export type UpdatePolicyApiArg = {
  policyId: string;
  policy: Policy;
};
export type DeletePolicyApiResponse =
  /** status 200 200 response */ EmptySchema;
export type DeletePolicyApiArg = {
  policyId: string;
};
export type UnsubscribePoliciesBulkApiResponse =
  /** status 200 200 response */ EmptySchema;
export type UnsubscribePoliciesBulkApiArg = {
  idList: IdList;
};
export type GetSsoConfigApiResponse = /** status 200 200 response */ IsSso;
export type GetSsoConfigApiArg = {
  email: string;
};
export type MarkViolationOpenApiResponse =
  /** status 200 200 response */ Violation;
export type MarkViolationOpenApiArg = {
  violationId: string;
};
export type ListPolicyComplianceControlsApiResponse =
  /** status 200 200 response */ PolicyComplianceControlList;
export type ListPolicyComplianceControlsApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
  policyId: string;
};
export type UpdatePolicyComplianceControlsApiResponse =
  /** status 200 200 response */ EmptySchema;
export type UpdatePolicyComplianceControlsApiArg = {
  policyId: string;
  idList: IdList;
};
export type RunPolicyApiResponse = /** status 200 200 response */
  | string
  | /** status 202 202 response */ EmptySchema;
export type RunPolicyApiArg = {
  policyId: string;
  datasourceId: string;
};
export type DeleteSumoLogicApiResponse =
  /** status 200 200 response */ EmptySchema;
export type DeleteSumoLogicApiArg = {
  integrationId: string;
};
export type GetDatasourceResourcesApiResponse =
  /** status 200 200 response */ Datasource;
export type GetDatasourceResourcesApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
  datasourceType?: string;
  datasourceId: string;
};
export type ListPolicyIdsApiResponse = /** status 200 200 response */ IdList;
export type ListPolicyIdsApiArg = {
  onlyFailed?: string;
  sortBy?: string;
  tag?: string;
  name?: string;
  severityLabel?: string;
  secberusManaged?: string;
  datasourceType?: string;
  categoryId?: string;
  resourceData?: string;
  complianceId?: string;
  datasourceId?: string;
  limit?: string;
  resourceId?: string;
  categoryType?: string;
  page?: string;
  subscribed?: string;
};
export type PostLoginOldrinTestApiResponse =
  /** status 200 200 response */ EmptySchema;
export type PostLoginOldrinTestApiArg = void;
export type GetDatasourceApiResponse =
  /** status 200 200 response */ Datasource;
export type GetDatasourceApiArg = {
  datasourceId: string;
};
export type UpdateDatasourceApiResponse =
  /** status 200 200 response */ Datasource;
export type UpdateDatasourceApiArg = {
  datasourceId: string;
  datasource: Datasource;
};
export type DeleteDatasourceApiResponse =
  /** status 200 200 response */ EmptySchema;
export type DeleteDatasourceApiArg = {
  datasourceId: string;
};
export type SubscribePoliciesBulkApiResponse =
  /** status 200 200 response */ EmptySchema;
export type SubscribePoliciesBulkApiArg = {
  idList: IdList;
};
export type GetComplianceFrameworkApiResponse =
  /** status 200 200 response */ ComplianceFramework;
export type GetComplianceFrameworkApiArg = {
  frameworkId: string;
};
export type ToggleFrameworkApiResponse =
  /** status 200 200 response */ ComplianceFramework;
export type ToggleFrameworkApiArg = {
  frameworkId: string;
  complianceFrameworkPatch: ComplianceFrameworkPatch;
};
export type ListPolicyDatasourcesApiResponse =
  /** status 200 200 response */ DatasourceList;
export type ListPolicyDatasourcesApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
  policyId: string;
};
export type UpdatePolicyDatasourcesApiResponse =
  /** status 200 200 response */ EmptySchema;
export type UpdatePolicyDatasourcesApiArg = {
  policyId: string;
  policyDatasourceIds: PolicyDatasourceIds;
};
export type RequestCsvExportApiResponse =
  /** status 200 200 response */ ComplianceFrameworkCsv;
export type RequestCsvExportApiArg = {
  resourceData?: string;
  datasourceId?: string;
  resourceId?: string;
  datasourceType?: string;
  frameworkId: string;
};
export type GetCategoryApiResponse =
  /** status 200 200 response */ PolicyCategory;
export type GetCategoryApiArg = {
  categoryId: string;
};
export type UpdateCategoryApiResponse =
  /** status 200 200 response */ PolicyCategory;
export type UpdateCategoryApiArg = {
  categoryId: string;
  policyCategory: PolicyCategory;
};
export type DeleteCategoryApiResponse =
  /** status 200 200 response */ EmptySchema;
export type DeleteCategoryApiArg = {
  replacementCategoryId?: string;
  categoryId: string;
};
export type PostTfcByTfcIdApiResponse =
  /** status 200 200 response */ EmptySchema;
export type PostTfcByTfcIdApiArg = {
  tfcId: string;
};
export type ListOrgsApiResponse = /** status 200 200 response */ OrgList;
export type ListOrgsApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
};
export type CreateOrgApiResponse = /** status 200 200 response */ Org;
export type CreateOrgApiArg = {
  createOrg: CreateOrg;
};
export type ComputeControlComplianceApiResponse =
  /** status 200 200 response */ ComplianceControlAugmented;
export type ComputeControlComplianceApiArg = {
  resourceData?: string;
  datasourceId?: string;
  resourceId?: string;
  datasourceType?: string;
  controlId: string;
};
export type SuppressViolationsApiResponse =
  /** status 200 200 response */ ViolationList;
export type SuppressViolationsApiArg = {
  idList: IdList;
};
export type ListIntegrationsApiResponse =
  /** status 200 200 response */ IntegrationList;
export type ListIntegrationsApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
  integrationId?: string;
  type?: string;
};
export type CreateIntegrationApiResponse =
  /** status 200 200 response */ Integration;
export type CreateIntegrationApiArg = {
  createIntegration: CreateIntegration;
};
export type GetServiceNowCallbackApiResponse =
  /** status 200 200 response */ string;
export type GetServiceNowCallbackApiArg = {
  state: string;
  code: string;
};
export type PostGithubWebhookApiResponse = unknown;
export type PostGithubWebhookApiArg = void;
export type AuthorizeIntegrationApiResponse =
  /** status 200 200 response */ EmptySchema;
export type AuthorizeIntegrationApiArg = {
  integrationId: string;
};
export type SetUserRolesApiResponse =
  /** status 200 200 response */ EmptySchema;
export type SetUserRolesApiArg = {
  userid: string;
  orgId: string;
  idList: IdList;
};
export type AddUserRolesApiResponse =
  /** status 200 200 response */ EmptySchema;
export type AddUserRolesApiArg = {
  userid: string;
  orgId: string;
  idList: IdList;
};
export type RemoveUserRolesApiResponse =
  /** status 200 200 response */ EmptySchema;
export type RemoveUserRolesApiArg = {
  userid: string;
  orgId: string;
  idList: IdList;
};
export type GetSumoLogicApiResponse =
  /** status 200 200 response */ Integration;
export type GetSumoLogicApiArg = void;
export type CreateSumoLogicApiResponse =
  /** status 200 200 response */ Integration;
export type CreateSumoLogicApiArg = {
  createSumoLogic: CreateSumoLogic;
};
export type GetDatasourceSummaryApiResponse =
  /** status 200 200 response */ DatasourceSummary;
export type GetDatasourceSummaryApiArg = void;
export type GetMetricApiResponse = /** status 200 200 response */ Timeseries;
export type GetMetricApiArg = {
  limit?: string;
  service?: string;
  startTime?: string;
  endTime?: string;
  name: string;
};
export type GetSsoDetailsApiResponse =
  /** status 200 200 response */ SsoDetails;
export type GetSsoDetailsApiArg = void;
export type MarkViolationFixedApiResponse =
  /** status 200 200 response */ Violation;
export type MarkViolationFixedApiArg = {
  violationId: string;
};
export type GetLogsApiResponse =
  /** status 200 200 response */ CustomerLogEventList;
export type GetLogsApiArg = {
  sortBy?: string;
  startTime?: string;
  before?: string;
  after?: string;
  q?: string;
  endTime?: string;
};
export type GetViolationCountPerPoliciesApiResponse =
  /** status 200 200 response */ PoliciesViolationCountResponse;
export type GetViolationCountPerPoliciesApiArg = {
  policyIdList: PolicyIdList;
};
export type GetControlPoliciesApiResponse =
  /** status 200 200 response */ ComplianceControlPolicyList;
export type GetControlPoliciesApiArg = {
  controlId: string;
};
export type SwitchOrgApiResponse = /** status 200 200 response */ EmptySchema;
export type SwitchOrgApiArg = {
  orgid: string;
};
export type GetViolationsApiResponse =
  /** status 200 200 response */ ViolationList;
export type GetViolationsApiArg = {
  sortBy?: string;
  tag?: string;
  policyId?: string;
  status?: string;
  notBefore?: string;
  datasourceType?: string;
  categoryId?: string;
  resourceData?: string;
  complianceId?: string;
  datasourceId?: string;
  suppressed?: string;
  limit?: string;
  resourceId?: string;
  categoryName?: string;
  severity?: string;
  notAfter?: string;
  page?: string;
};
export type GetExceptionApiResponse = /** status 200 200 response */ Exception;
export type GetExceptionApiArg = {
  exceptionId: string;
};
export type UpdateExceptionApiResponse =
  /** status 200 200 response */ Exception;
export type UpdateExceptionApiArg = {
  exceptionId: string;
  updateException: UpdateException;
};
export type DeleteExceptionApiResponse =
  /** status 200 200 response */ Exception;
export type DeleteExceptionApiArg = {
  exceptionId: string;
};
export type ListResourcesApiResponse =
  /** status 200 200 response */ ResourceList;
export type ListResourcesApiArg = {
  datasourceType?: string;
};
export type ListWorkflowsApiResponse =
  /** status 200 200 response */ WorkflowList;
export type ListWorkflowsApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
};
export type CreateWorkflowApiResponse = /** status 200 200 response */ Workflow;
export type CreateWorkflowApiArg = {
  workflow: Workflow;
};
export type RequestPolicyViolationsCsvApiResponse =
  /** status 200 200 response */ EmptySchema;
export type RequestPolicyViolationsCsvApiArg = {
  tag?: string;
  policyId: string;
  status?: string;
  notBefore?: string;
  datasourceType?: string;
  categoryId?: string;
  resourceData?: string;
  complianceId?: string;
  datasourceId?: string;
  suppressed?: string;
  resourceId?: string;
  categoryName?: string;
  severity?: string;
  notAfter?: string;
};
export type ListDatasourcesApiResponse =
  /** status 200 200 response */ DatasourceList;
export type ListDatasourcesApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
  datasourceType?: string;
};
export type CreateDatasourceApiResponse =
  /** status 200 200 response */ Datasource;
export type CreateDatasourceApiArg = {
  datasource: Datasource;
};
export type GetIntegrationApiResponse =
  /** status 200 200 response */ Integration;
export type GetIntegrationApiArg = {
  integrationId: string;
};
export type UpdateIntegrationApiResponse =
  /** status 200 200 response */ Integration;
export type UpdateIntegrationApiArg = {
  integrationId: string;
  updateIntegration: UpdateIntegration;
};
export type DeleteIntegrationApiResponse =
  /** status 200 200 response */ Integration;
export type DeleteIntegrationApiArg = {
  integrationId: string;
};
export type GithubInstallationApiResponse =
  /** status 200 200 response */ EmptySchema;
export type GithubInstallationApiArg = {
  githubInstallationRequest: GithubInstallationRequest;
};
export type GetRiskPostureApiResponse =
  /** status 200 200 response */ EmptySchema;
export type GetRiskPostureApiArg = {
  riskPostureParams: RiskPostureParams;
};
export type GetReportingEmailCallbackApiResponse =
  /** status 200 200 response */ string;
export type GetReportingEmailCallbackApiArg = {
  state: string;
};
export type TallyViolationsApiResponse =
  /** status 200 200 response */ EmptySchema;
export type TallyViolationsApiArg = {
  tag?: string;
  policyId?: string;
  status?: string;
  notBefore?: string;
  datasourceType?: string;
  categoryId?: string;
  resourceData?: string;
  complianceId?: string;
  datasourceId?: string;
  suppressed?: string;
  resourceId?: string;
  categoryName?: string;
  severity?: string;
  notAfter?: string;
};
export type CreateTfcRunTaskIntegrationApiResponse =
  /** status 200 200 response */ Datasource;
export type CreateTfcRunTaskIntegrationApiArg = {
  tfcRunTaskIntegration: TfcRunTaskIntegration;
};
export type GetUserOrgsApiResponse = /** status 200 200 response */ UserOrgList;
export type GetUserOrgsApiArg = {
  userid: string;
};
export type DisableWorkflowApiResponse =
  /** status 200 200 response */ EmptySchema;
export type DisableWorkflowApiArg = {
  workflowId: string;
};
export type RequestViolationsCsvApiResponse =
  /** status 200 200 response */ EmptySchema;
export type RequestViolationsCsvApiArg = {
  sortBy?: string;
  tag?: string;
  policyId?: string;
  status?: string;
  notBefore?: string;
  datasourceType?: string;
  categoryId?: string;
  resourceData?: string;
  complianceId?: string;
  datasourceId?: string;
  suppressed?: string;
  limit?: string;
  resourceId?: string;
  categoryName?: string;
  severity?: string;
  notAfter?: string;
  page?: string;
};
export type GetAccessPolicyApiResponse =
  /** status 200 200 response */ AccessPolicy;
export type GetAccessPolicyApiArg = {
  accessPolicyId: string;
};
export type UpdateAccessPolicyApiResponse =
  /** status 200 200 response */ AccessPolicy;
export type UpdateAccessPolicyApiArg = {
  accessPolicyId: string;
  updateAccessPolicy: UpdateAccessPolicy;
};
export type DeleteAccessPolicyApiResponse =
  /** status 200 200 response */ EmptySchema;
export type DeleteAccessPolicyApiArg = {
  accessPolicyId: string;
};
export type BinViolationsApiResponse =
  /** status 200 200 response */ EmptySchema;
export type BinViolationsApiArg = {
  tag?: string;
  policyId?: string;
  status?: string;
  notBefore?: string;
  datasourceType?: string;
  categoryId?: string;
  resourceData?: string;
  complianceId?: string;
  datasourceId?: string;
  suppressed?: string;
  resourceId?: string;
  categoryName?: string;
  severity?: string;
  notAfter?: string;
};
export type UnsuppressViolationApiResponse =
  /** status 200 200 response */ Violation;
export type UnsuppressViolationApiArg = {
  violationId: string;
};
export type SendVerificationApiResponse = /** status 200 200 response */ string;
export type SendVerificationApiArg = {
  sendVerification: SendVerification;
};
export type GetAuthTokenApiResponse =
  /** status 200 200 response */ CredentialReturn;
export type GetAuthTokenApiArg = {
  credentialLogin: CredentialLogin;
};
export type GetWorkflowApiResponse = /** status 200 200 response */ Workflow;
export type GetWorkflowApiArg = {
  workflowId: string;
};
export type UpdateWorkflowApiResponse = /** status 200 200 response */ Workflow;
export type UpdateWorkflowApiArg = {
  workflowId: string;
  workflow: Workflow;
};
export type DeleteWorkflowApiResponse =
  /** status 200 200 response */ EmptySchema;
export type DeleteWorkflowApiArg = {
  workflowId: string;
};
export type ListCategoriesApiResponse =
  /** status 200 200 response */ PolicyCategoryList;
export type ListCategoriesApiArg = {
  sortBy?: string;
  categoryType?: string;
  limit?: string;
  page?: string;
};
export type CreateCategoryApiResponse =
  /** status 200 200 response */ PolicyCategory;
export type CreateCategoryApiArg = {
  policyCategory: PolicyCategory;
};
export type GetSelfApiResponse = /** status 200 200 response */ Self;
export type GetSelfApiArg = void;
export type UpdateSelfApiResponse = /** status 200 200 response */ Self;
export type UpdateSelfApiArg = {
  updateSelf: UpdateSelf;
};
export type ListExceptionsApiResponse =
  /** status 200 200 response */ ExceptionList;
export type ListExceptionsApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
};
export type CreateExceptionApiResponse =
  /** status 200 200 response */ Exception;
export type CreateExceptionApiArg = {
  createException: CreateException;
};
export type TestPolicyApiResponse =
  /** status 200 200 response */ ViolationList;
export type TestPolicyApiArg = {
  testPolicy: TestPolicy;
};
export type GetReportScheduleApiResponse =
  /** status 200 200 response */ ReportSchedule;
export type GetReportScheduleApiArg = {
  reportId: string;
};
export type UpdateReportScheduleApiResponse =
  /** status 200 200 response */ ReportSchedule;
export type UpdateReportScheduleApiArg = {
  reportId: string;
  updateReportSchedule: UpdateReportSchedule;
};
export type DeleteReportScheduleApiResponse =
  /** status 200 200 response */ ReportSchedule;
export type DeleteReportScheduleApiArg = {
  reportId: string;
};
export type ListDatasourceTypesApiResponse =
  /** status 200 200 response */ DatasourceTypeList;
export type ListDatasourceTypesApiArg = void;
export type ListUsersApiResponse = /** status 200 200 response */ UserList;
export type ListUsersApiArg = {
  term?: string;
  sortBy?: string;
  limit?: string;
  page?: string;
};
export type CreateUserApiResponse = /** status 200 200 response */ User;
export type CreateUserApiArg = {
  createUser: CreateUser;
};
export type GenerateReportApiResponse =
  /** status 200 200 response */ EmptySchema;
export type GenerateReportApiArg = {
  integrationId: string;
  reportType: string;
};
export type ListPolicyExceptionsApiResponse =
  /** status 200 200 response */ ExceptionList;
export type ListPolicyExceptionsApiArg = {
  sortBy?: string;
  limit?: string;
  page?: string;
  policyId: string;
};
export type DeleteSplunkApiResponse =
  /** status 200 200 response */ EmptySchema;
export type DeleteSplunkApiArg = {
  integrationId: string;
};
export type GetComplianceControlApiResponse =
  /** status 200 200 response */ ComplianceControl;
export type GetComplianceControlApiArg = {
  controlId: string;
};
export type ListDatasourcesByRiskApiResponse =
  /** status 200 200 response */ UnpaginatedDatasourceList;
export type ListDatasourcesByRiskApiArg = void;
export type EmptySchema = object;
export type ApiErrorSchema = {
  requestid?: string;
  link?: string;
  http_status?: number;
  detail?: string;
  title?: string;
};
export type SsoDetails = {
  redirectURI: string[];
  logoutURI: string[];
  loginURI: string;
  details?: {
    general?: string;
    client?: string;
    scopes?: string;
    consent?: string;
  };
};
export type AddSsoProvider = {
  issuer_url: string;
  name: string;
  client_secret: string;
  email_domains: string[];
  client_id: string;
};
export type ComplianceControl = {
  id?: string;
  ordinal?: string;
  identifier?: string;
  description?: string;
  depth?: number;
  children?: ComplianceControl[];
};
export type ComplianceFramework = {
  full_org_coverage?: boolean;
  secberus_managed?: boolean;
  description?: string;
  version?: string;
  enabled?: boolean;
  url?: string;
  depth?: number;
  update_timestamp?: number;
  children?: ComplianceControl[];
  name?: string;
  datasource_types?: string[];
  id?: string;
  policy_count?: number;
};
export type ComplianceFrameworkList = ComplianceFramework[];
export type IdList = string[];
export type Violation = {
  summary: string;
  severity: number;
  category_name: string;
  close_timestamp: number;
  comments?: {
    create_timestamp?: number;
    id?: string;
    message?: string;
    email?: string;
  }[];
  policy_id: string;
  resource: {
    data?: object;
    identifier_hash?: string;
    id?: string;
  };
  exception_id?: string;
  policy_name: string;
  seen_timestamp: number;
  tags?: object;
  category_id: string;
  datasources: {
    name?: string;
    id?: string;
    type?: 'AWS' | 'Azure' | 'GCP';
  }[];
  create_timestamp: number;
  exception_name?: string;
  org_id: string;
  id: string;
  suppressed: boolean;
  status: string;
};
export type Cursor = {
  total: number;
  pages: number;
  limit: number;
  page: number;
  sort_by?: string[];
};
export type Email = {
  verified?: boolean;
  email: string;
};
export type ReportDatasource = {
  org_id?: string;
  name: string;
  verified?: boolean;
  id?: string;
  datasource_type_id?: string;
};
export type ReportSchedule = {
  owner?: string;
  emails?: Email[];
  header_image?: string;
  datasources?: ReportDatasource[];
  frameworks?: string[];
  created_on?: number;
  include_recommendations?: boolean;
  integration?: object;
  name: string;
  interval: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  id: string;
  type: 'OVERVIEW' | 'COMPLIANCE';
};
export type ReportScheduleList = {
  cursor: Cursor;
  results: ReportSchedule[];
};
export type CreateReportSchedule = {
  header_image?: string;
  emails?: string[];
  integration_id?: string;
  datasources?: string[];
  frameworks?: string[];
  include_recommendations?: boolean;
  name: string;
  interval: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  type: 'COMPLIANCE' | 'OVERVIEW';
};
export type ViolationComment = {
  create_timestamp?: number;
  id: string;
  message: string;
  email: string;
};
export type ViolationCommentList = ViolationComment[];
export type CreateViolationComment = {
  message: string;
};
export type ComplianceControlList = ComplianceControl[];
export type ViolationList = {
  cursor: Cursor;
  results: Violation[];
};
export type AccessPolicyRole = {
  name: string;
  id: string;
};
export type AccessPolicyRoleList = AccessPolicyRole[];
export type AccessPolicy = {
  secberus_managed: boolean;
  roles: AccessPolicyRoleList;
  name: string;
  description?: string;
  id: string;
  logic: string;
};
export type AccessRole = {
  secberus_managed: boolean;
  name: string;
  policies?: AccessPolicy[];
  description?: string;
  id: string;
};
export type UpdateRole = {
  name: string;
  description?: string;
  policy_ids?: string[];
};
export type SignedUrl = {
  signed_url?: string;
  image_key?: string;
};
export type CreateSignedUrl = {
  image_name: string;
};
export type Account = {
  name: string;
  sid?: string;
};
export type Datasource = {
  resource_statuses?: {
    collection_status?: boolean;
    description: string;
    last_successful?: number;
    last_attempt?: number;
  }[];
  data: {
    [key: string]: any;
  };
  resources_count?: number;
  resources_collected?: number;
  connection_status?: string;
  verified?: boolean;
  policy_status?: string;
  datasource_type_id: string;
  last_attempt?: number;
  policy_last_run?: number;
  score?: number;
  org_id?: string;
  name: string;
  last_successful?: number;
  id?: string;
};
export type DatasourceList = {
  cursor: Cursor;
  results: Datasource[];
};
export type ReinviteUser = {
  email: string;
};
export type ComplianceFrameworkSummary = {
  name: string;
  compliance_summary: number;
  id: string;
};
export type ComplianceFrameworkSummaryList = {
  cursor: Cursor;
  results: ComplianceFrameworkSummary[];
};
export type UserOrgRole = {
  secberus_managed: boolean;
  name: string;
  id: string;
};
export type UserOrgRoleList = UserOrgRole[];
export type UserOrg = {
  roles: UserOrgRoleList;
  name: string;
  id: string;
};
export type UserOrgList = UserOrg[];
export type User = {
  zoneinfo?: string;
  email_verified?: boolean;
  given_name?: string;
  account_owner?: boolean;
  phone?: string;
  login_time?: number;
  permissions?: string[];
  name: string;
  mfa_enabled?: boolean;
  id?: string;
  orgs?: UserOrgList;
  family_name?: string;
  email?: string;
  username: string;
};
export type UpdateUser = {
  zoneinfo?: string;
  phone?: string;
  name: string;
  given_name?: string;
  family_name: string;
  account_owner: boolean;
};
export type AccessRoleList = {
  cursor: Cursor;
  results: AccessRole[];
};
export type CreateRole = {
  name: string;
  description?: string;
  policy_ids?: string[];
};
export type GithubAppState = {
  state: string;
};
export type Org = {
  user_count?: number;
  datasource_count?: number;
  name: string;
  description?: string;
  id: string;
};
export type CreateOrg = {
  name: string;
  description?: string;
};
export type AccessPolicyList = {
  cursor: Cursor;
  results: AccessPolicy[];
};
export type CreateAccessPolicy = {
  name: string;
  description?: string;
  logic: string;
};
export type Resource = {
  schema?: {
    [key: string]: any;
  };
  identifier?: string[];
  production: boolean;
  secberus_managed: boolean;
  example_data?: {
    [key: string]: any;
  };
  name: string;
  description: string;
  datasource_types?: string[];
  id: string;
  dependencies?: string[];
};
export type ComplianceControlAugmented = {
  children?: ComplianceControlAugmented[];
  description?: string;
  failed_policy_count?: number;
  id?: string;
  identifier?: string;
  ordinal?: string;
  depth?: number;
  policies?: {
    id?: string;
    name?: string;
    severity?: number;
    violation_count?: number;
  }[];
  policy_count?: number;
  violation_count?: number;
  violations?: {
    datasources?: {
      id?: string;
      name?: string;
      type?: string;
    }[];
    id?: string;
    policy_name?: string;
    resource?: {
      id?: string;
      identifier?: object;
    };
  }[];
};
export type ComplianceFrameworkAugmented = {
  full_org_coverage?: boolean;
  violation_count?: number;
  secberus_managed?: boolean;
  violations?: {
    datasources?: {
      name?: string;
      id?: string;
      type?: string;
    }[];
    resource?: {
      data?: object;
      identifier_hash?: string;
      id?: string;
    };
    policy_name?: string;
    id?: string;
  }[];
  policies?: {
    severity?: number;
    name?: string;
    id?: string;
  }[];
  description?: string;
  version?: string;
  url?: string;
  failed_policy_count?: number;
  depth?: number;
  control_count?: number;
  failed_control_count?: number;
  update_timestamp?: number;
  children?: ComplianceControlAugmented[];
  name?: string;
  id?: string;
  policy_count?: number;
  compliance_score?: number;
};
export type OrgUserRole = {
  secberus_managed: boolean;
  name: string;
  id: string;
};
export type OrgUserRoleList = OrgUserRole[];
export type OrgUser = {
  roles?: OrgUserRoleList;
  name: string;
  id: string;
  family_name: string;
  email: string;
};
export type OrgUserList = {
  cursor: Cursor;
  results: OrgUser[];
};
export type Integration =
  | {
      name: string;
      verified: boolean;
      id: string;
      type: 'EMAIL';
      spec: {
        emails: string[];
      };
    }
  | {
      name: string;
      verified: boolean;
      id: string;
      type: 'REDMINE';
      spec: {
        tracker?: string;
        project?: string;
        category?: string;
        priority?: string;
        email: string;
        assigned_to?: string;
        status?: string;
      };
    }
  | {
      name: string;
      verified: boolean;
      id: string;
      type: 'SLACK' | 'MSTEAMS' | 'HTTP';
      spec: {
        url: string;
      };
    }
  | {
      name: string;
      verified: boolean;
      id: string;
      type: 'PAGERDUTY';
      spec: {
        routing_key: string;
        url?: string;
      };
    }
  | {
      name: string;
      verified: boolean;
      id: string;
      type: 'JIRA_BASIC';
      spec: {
        api_token: string;
        issue_type: string;
        project: string;
        url: string;
        username: string;
      };
    }
  | {
      name: string;
      verified: boolean;
      id: string;
      type: 'JIRA_OAUTH';
      spec: {
        consumer_key?: string;
        public_key?: string;
        issue_type: string;
        project: string;
        url: string;
      };
    }
  | {
      name: string;
      verified: boolean;
      id: string;
      type: 'SERVICENOW';
      spec: {
        assigned_group?: string;
        category?: string;
        client_id: string;
        table?: string;
        url: string;
        assigned_to?: string;
      };
    }
  | {
      owner: string;
      date_updated?: string;
      date_created: string;
      name: string;
      active: boolean;
      index: string;
      id: string;
      category: string;
      type: 'SPLUNK';
      splunk_url: string;
      hec_token: string;
    }
  | {
      owner: string;
      date_updated?: string;
      date_created: string;
      name: string;
      active: boolean;
      id: string;
      category: string;
      type: 'SUMOLOGIC';
      url: string;
    };
export type CreateSplunk = {
  name: string;
  index?: string;
  splunk_url: string;
  hec_token: string;
};
export type SeveritySummary = {
  HIGH: string;
  MEDIUM: string;
  LOW: string;
  CRITICAL: string;
};
export type CategoryType = 'OPERATIONS' | 'SECURITY';
export type Policy = {
  severity: number;
  controls?: {
    identifier?: string;
    id?: string;
    compliance_id?: string;
    compliance_name?: string;
  }[];
  policy_category_id?: string;
  violation_count?: number;
  secberus_managed: boolean;
  violation_summary_tmpl: string;
  description: string;
  policy_category_type?: CategoryType;
  label?: string;
  total_violation_count?: number;
  remediation_steps?: string;
  rationale?: string;
  subscribed: boolean;
  score?: number;
  org_id?: string;
  name: string;
  resource_id: string;
  datasource_types?: string[];
  id?: string;
  logic: string;
  resource_name?: string;
  policy_category_name?: string;
};
export type PolicyList = {
  cursor: Cursor;
  results: Policy[];
};
export type PolicySummary = {
  score: number;
  org_id?: string;
  name: string;
  id: string;
}[];
export type IsSso = {
  provider?: string;
  sso: boolean;
  client_id?: string;
};
export type PolicyComplianceControlList = {
  cursor: Cursor;
  results: {
    identifier?: string;
    id?: string;
    compliance_id?: string;
    compliance_name?: string;
  }[];
};
export type ComplianceFrameworkPatch = {
  enabled: boolean;
};
export type PolicyDatasourceIds = {
  datasource_ids?: string[];
};
export type ComplianceFrameworkCsv = {
  message: string;
};
export type PolicyCategory = {
  org_id?: string;
  secberus_managed?: boolean;
  name: string;
  policies?: Policy[];
  category_type: CategoryType;
  id?: string;
};
export type OrgList = {
  cursor: Cursor;
  results: Org[];
};
export type IntegrationList = {
  cursor: Cursor;
  results: Integration[];
};
export type CreateIntegration =
  | {
      name: string;
      type: 'EMAIL';
      spec: {
        emails: string[];
      };
    }
  | {
      name: string;
      type: 'REDMINE';
      spec: {
        tracker?: string;
        project?: string;
        category?: string;
        priority?: string;
        email: string;
        assigned_to?: string;
        status?: string;
      };
    }
  | {
      name: string;
      type: 'SLACK' | 'MSTEAMS' | 'HTTP';
      spec: {
        url: string;
      };
    }
  | {
      name: string;
      type: 'PAGERDUTY';
      spec: {
        routing_key: string;
      };
    }
  | {
      name: string;
      type: 'JIRA_BASIC';
      spec: {
        api_token: string;
        issue_type: string;
        project: string;
        url: string;
        username: string;
      };
    }
  | {
      name: string;
      type: 'JIRA_OAUTH';
      spec: {
        issue_type: string;
        project: string;
        url: string;
      };
    }
  | {
      name: string;
      type: 'SERVICENOW';
      spec: {
        assigned_group?: string;
        client_secret: string;
        category?: string;
        client_id: string;
        table?: string;
        url: string;
        assigned_to?: string;
      };
    };
export type CreateSumoLogic = {
  name: string;
  url: string;
};
export type DatasourceSummary = {
  count?: number;
  datasource_type_id?: string;
}[];
export type TimeseriesDatum = {
  value: number;
  timestamp: number;
};
export type Timeseries = TimeseriesDatum[];
export type CustomerLogEvent = {
  id: string;
  severity: string;
  sid: string;
  org_id: string;
  event_name: string;
  username: string;
  timestamp: number;
  source: string;
  context: {};
  message: string;
  parent_id?: string;
  children?: CustomerLogEvent[];
};
export type CustomerLogEventList = CustomerLogEvent[];
export type PoliciesViolationCountResponse = {
  [key: string]: string;
};
export type PolicyIdList = {
  policy_ids: string[];
};
export type ComplianceControlPolicyList = {
  severity?: number;
  name?: string;
  id?: string;
}[];
export type Exception = {
  org_id: string;
  name: string;
  comment: string;
  id: string;
  conditions: {
    [key: string]: any;
  }[];
  enabled: boolean;
};
export type UpdateException = {
  name?: string;
  comment?: string;
  conditions?: {
    [key: string]: any;
  }[];
  enabled?: boolean;
};
export type ResourceList = Resource[];
export type Workflow = {
  org_id?: string;
  name: string;
  id?: string;
  conditions: {
    [key: string]: any;
  }[];
  actions: {
    [key: string]: any;
  }[];
  enabled?: boolean;
};
export type WorkflowList = {
  cursor: Cursor;
  results: Workflow[];
};
export type UpdateIntegration =
  | {
      name?: string;
      spec?: {
        emails: string[];
      };
    }
  | {
      name?: string;
      spec?: {
        tracker: string;
        project: string;
        category: string;
        priority: string;
        email: string;
        assigned_to: string;
        status: string;
      };
    }
  | {
      name?: string;
      spec?: {
        url: string;
      };
    }
  | {
      name?: string;
      spec?: {
        routing_key: string;
      };
    }
  | {
      name?: string;
      spec?: {
        api_token?: string;
        issue_type?: string;
        project?: string;
        url?: string;
        username?: string;
      };
    }
  | {
      name?: string;
      spec?: {
        issue_type?: string;
        project?: string;
        url?: string;
      };
    }
  | {
      name?: string;
      spec?: {
        assigned_group?: string;
        category?: string;
        client_id?: string;
        table?: string;
        url?: string;
        assigned_to?: string;
      };
    };
export type GithubInstallationRequest = {
  installation_id: number;
  state: string;
};
export type RiskPostureParams = {
  datasource_id?: string[];
  category_id?: string[];
  datasource_type?: ('AWS' | 'GCP' | 'Azure' | 'Github')[];
  resource_data?: string[];
  category_type?: CategoryType[];
  resource_id?: string[];
  compliance_id?: string[];
  severity_label?: ('LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL')[];
  tags?: string[];
};
export type TfcRunTaskIntegration = {
  hmac_key: string;
  integration_id: string;
  name: string;
};
export type UpdateAccessPolicy = {
  name: string;
  description?: string;
  logic: string;
};
export type SendVerification = {
  emails: string[];
};
export type CredentialReturn = {
  success: boolean;
  response: object;
};
export type CredentialLogin = {
  password: string;
  email: string;
};
export type PolicyCategoryList = {
  cursor: Cursor;
  results: PolicyCategory[];
};
export type Self = {
  zoneinfo?: string;
  email_verified?: boolean;
  given_name?: string;
  account_owner: boolean;
  sid?: string;
  phone?: string;
  login_time?: number;
  permissions: string[];
  name: string;
  mfa_enabled?: boolean;
  id: string;
  orgs: UserOrgList;
  family_name?: string;
  email: string;
  username: string;
};
export type UpdateSelf = {
  phone?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
};
export type ExceptionList = {
  cursor: Cursor;
  results: Exception[];
};
export type CreateException = {
  name: string;
  comment?: string;
  conditions: {
    [key: string]: any;
  }[];
  enabled?: boolean;
};
export type TestPolicy = {
  resource_id: string;
  logic: string;
  resource_name: string;
};
export type UpdateReportSchedule = {
  emails?: string[];
  datasources?: string[];
  frameworks?: string[];
  include_recommendations?: boolean;
  name?: string;
  interval?: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
};
export type DatasourceType = {
  mode: string;
  name: string;
  description?: string;
  resources?: {
    [key: string]: any;
  }[];
  id?: string;
  category?: string;
};
export type DatasourceTypeList = DatasourceType[];
export type UserList = {
  cursor: Cursor;
  results: User[];
};
export type CreateUser = {
  zoneinfo?: string;
  email_verified?: boolean;
  phone?: string;
  name: string;
  mfa_enabled?: boolean;
  given_name?: string;
  family_name: string;
  account_owner?: boolean;
  username: string;
};
export type UnpaginatedDatasourceList = Datasource[];
export const {
  useListSsoProvidersQuery,
  useGetComplianceFrameworksQuery,
  useListReportSchedulesQuery,
  useGetViolationQuery,
  useGetViolationCommentsQuery,
  useGetControlAncestryQuery,
  useGetRoleQuery,
  useGetAccountMetaQuery,
  useListDatasourcesStatusQuery,
  useGetEmailCallbackQuery,
  useGetComplianceFrameworksSummaryQuery,
  useGetUserQuery,
  useListRolesQuery,
  useGetOrgQuery,
  useListAccessPoliciesQuery,
  useGetResourceQuery,
  useGetComplianceFrameworkComplianceQuery,
  useGetOrgUsersQuery,
  useGetSplunkQuery,
  useGetViolationSeveritySummaryQuery,
  useListPoliciesQuery,
  useSummarizePoliciesQuery,
  useGetPolicyQuery,
  useGetSsoConfigQuery,
  useListPolicyComplianceControlsQuery,
  useGetDatasourceResourcesQuery,
  useListPolicyIdsQuery,
  useGetDatasourceQuery,
  useGetComplianceFrameworkQuery,
  useListPolicyDatasourcesQuery,
  useGetCategoryQuery,
  useListOrgsQuery,
  useComputeControlComplianceQuery,
  useListIntegrationsQuery,
  useGetServiceNowCallbackQuery,
  useGetSumoLogicQuery,
  useGetDatasourceSummaryQuery,
  useGetMetricQuery,
  useGetSsoDetailsQuery,
  useGetLogsQuery,
  useGetControlPoliciesQuery,
  useGetViolationsQuery,
  useGetExceptionQuery,
  useListResourcesQuery,
  useListWorkflowsQuery,
  useListDatasourcesQuery,
  useGetIntegrationQuery,
  useGetReportingEmailCallbackQuery,
  useGetUserOrgsQuery,
  useGetAccessPolicyQuery,
  useGetWorkflowQuery,
  useListCategoriesQuery,
  useGetSelfQuery,
  useListExceptionsQuery,
  useGetReportScheduleQuery,
  useListDatasourceTypesQuery,
  useListUsersQuery,
  useListPolicyExceptionsQuery,
  useGetComplianceControlQuery,
  useListDatasourcesByRiskQuery,
} = injectedRtkApi;
