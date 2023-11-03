import { secberusApiGenerated as api } from '../secberusApiGenerated';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOpenApiSpec: build.query<
      GetOpenApiSpecApiResponse,
      GetOpenApiSpecApiArg
    >({
      query: () => ({ url: `/v1/openapi` }),
    }),
    getHealthcheck: build.query<
      GetHealthcheckApiResponse,
      GetHealthcheckApiArg
    >({
      query: () => ({ url: `/v1/_healthcheck` }),
    }),
    loginCallback: build.mutation<
      LoginCallbackApiResponse,
      LoginCallbackApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/login/callback`,
        method: 'POST',
        body: queryArg.email,
      }),
    }),
    getSsoConfig: build.query<GetSsoConfigApiResponse, GetSsoConfigApiArg>({
      query: (queryArg) => ({
        url: `/v1/login/is-sso`,
        params: { email: queryArg.email },
      }),
    }),
    getAuthToken: build.mutation<GetAuthTokenApiResponse, GetAuthTokenApiArg>({
      query: (queryArg) => ({
        url: `/v1/login/token`,
        method: 'POST',
        body: queryArg.credentialLogin,
      }),
    }),
    listCategories: build.query<
      ListCategoriesApiResponse,
      ListCategoriesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/categories`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    getCategory: build.query<GetCategoryApiResponse, GetCategoryApiArg>({
      query: (queryArg) => ({ url: `/v1/categories/${queryArg.id}` }),
    }),
    deleteCategory: build.mutation<
      DeleteCategoryApiResponse,
      DeleteCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/categories/${queryArg.id}`,
        method: 'DELETE',
        params: { replacement_category_id: queryArg.replacementCategoryId },
      }),
    }),
    updateCategory: build.mutation<
      UpdateCategoryApiResponse,
      UpdateCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/categories/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.createCategory,
      }),
    }),
    listCompliances: build.query<
      ListCompliancesApiResponse,
      ListCompliancesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    createCompliance: build.mutation<
      CreateComplianceApiResponse,
      CreateComplianceApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks`,
        method: 'POST',
        body: queryArg.createCompliance,
      }),
    }),
    summarizeCompliances: build.query<
      SummarizeCompliancesApiResponse,
      SummarizeCompliancesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/summary`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    listComplianceLibrary: build.query<
      ListComplianceLibraryApiResponse,
      ListComplianceLibraryApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/library`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    getCompliance: build.query<GetComplianceApiResponse, GetComplianceApiArg>({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/${queryArg.id}`,
      }),
    }),
    deleteCompliance: build.mutation<
      DeleteComplianceApiResponse,
      DeleteComplianceApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    updateCompliance: build.mutation<
      UpdateComplianceApiResponse,
      UpdateComplianceApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.updateCompliance,
      }),
    }),
    toggleCompliance: build.mutation<
      ToggleComplianceApiResponse,
      ToggleComplianceApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.toggleCompliance,
      }),
    }),
    computeComplianceScore: build.query<
      ComputeComplianceScoreApiResponse,
      ComputeComplianceScoreApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/${queryArg.id}/compliance`,
        body: queryArg.computeComplianceScore,
      }),
    }),
    setComplianceVisibility: build.mutation<
      SetComplianceVisibilityApiResponse,
      SetComplianceVisibilityApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/${queryArg.id}/visibility`,
        method: 'POST',
        body: queryArg.setComplianceVisibility,
      }),
    }),
    publishCompliance: build.mutation<
      PublishComplianceApiResponse,
      PublishComplianceApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/${queryArg.id}/publish`,
        method: 'POST',
        body: queryArg.publishCompliance,
      }),
    }),
    addPolicyCompliance: build.mutation<
      AddPolicyComplianceApiResponse,
      AddPolicyComplianceApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/${queryArg.id}/policy`,
        method: 'POST',
        body: queryArg.addPolicyCompliance,
      }),
    }),
    removePolicyCompliance: build.mutation<
      RemovePolicyComplianceApiResponse,
      RemovePolicyComplianceApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/${queryArg.id}/policy`,
        method: 'DELETE',
        body: queryArg.removePolicyCompliance,
      }),
    }),
    addControlCompliance: build.mutation<
      AddControlComplianceApiResponse,
      AddControlComplianceApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/${queryArg.id}/control`,
        method: 'POST',
        body: queryArg.addControlCompliance,
      }),
    }),
    getControl: build.query<GetControlApiResponse, GetControlApiArg>({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/${queryArg.id}/control/${queryArg.ccid}`,
      }),
    }),
    removeControlCompliance: build.mutation<
      RemoveControlComplianceApiResponse,
      RemoveControlComplianceApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/compliance-frameworks/${queryArg.id}/control/${queryArg.ccid}`,
        method: 'DELETE',
      }),
    }),
    listDataSources: build.query<
      ListDataSourcesApiResponse,
      ListDataSourcesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/datasources`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    listSavedQueries: build.query<
      ListSavedQueriesApiResponse,
      ListSavedQueriesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/explorer/queries`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    saveQuery: build.mutation<SaveQueryApiResponse, SaveQueryApiArg>({
      query: (queryArg) => ({
        url: `/v1/explorer/queries`,
        method: 'POST',
        body: queryArg.saveSqlQuery,
      }),
    }),
    runQuery: build.mutation<RunQueryApiResponse, RunQueryApiArg>({
      query: (queryArg) => ({
        url: `/v1/explorer/queries/run`,
        method: 'POST',
        body: queryArg.sqlQuery,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
          datasource_id: queryArg.datasourceId,
        },
      }),
    }),
    getSavedQuery: build.query<GetSavedQueryApiResponse, GetSavedQueryApiArg>({
      query: (queryArg) => ({ url: `/v1/explorer/queries/${queryArg.id}` }),
    }),
    editQuery: build.mutation<EditQueryApiResponse, EditQueryApiArg>({
      query: (queryArg) => ({
        url: `/v1/explorer/queries/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.saveSqlQuery,
      }),
    }),
    deleteQuery: build.mutation<DeleteQueryApiResponse, DeleteQueryApiArg>({
      query: (queryArg) => ({
        url: `/v1/explorer/queries/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getTableData: build.query<GetTableDataApiResponse, GetTableDataApiArg>({
      query: (queryArg) => ({
        url: `/v1/explorer/tables/${queryArg.id}`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    listTables: build.query<ListTablesApiResponse, ListTablesApiArg>({
      query: () => ({ url: `/v1/explorer/tables` }),
    }),
    listViews: build.query<ListViewsApiResponse, ListViewsApiArg>({
      query: (queryArg) => ({
        url: `/v1/explorer/views`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    saveView: build.mutation<SaveViewApiResponse, SaveViewApiArg>({
      query: (queryArg) => ({
        url: `/v1/explorer/views`,
        method: 'POST',
        body: queryArg.saveView,
      }),
    }),
    getView: build.query<GetViewApiResponse, GetViewApiArg>({
      query: (queryArg) => ({ url: `/v1/explorer/views/${queryArg.id}` }),
    }),
    updateView: build.mutation<UpdateViewApiResponse, UpdateViewApiArg>({
      query: (queryArg) => ({
        url: `/v1/explorer/views/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.saveView,
      }),
    }),
    deleteView: build.mutation<DeleteViewApiResponse, DeleteViewApiArg>({
      query: (queryArg) => ({
        url: `/v1/explorer/views/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    listOrgs: build.query<ListOrgsApiResponse, ListOrgsApiArg>({
      query: (queryArg) => ({
        url: `/v1/orgs`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
        },
      }),
    }),
    createOrg: build.mutation<CreateOrgApiResponse, CreateOrgApiArg>({
      query: (queryArg) => ({
        url: `/v1/orgs`,
        method: 'POST',
        body: queryArg.createOrg,
      }),
    }),
    getOrg: build.query<GetOrgApiResponse, GetOrgApiArg>({
      query: (queryArg) => ({ url: `/v1/orgs/${queryArg.id}` }),
    }),
    deleteOrg: build.mutation<DeleteOrgApiResponse, DeleteOrgApiArg>({
      query: (queryArg) => ({
        url: `/v1/orgs/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    updateOrg: build.mutation<UpdateOrgApiResponse, UpdateOrgApiArg>({
      query: (queryArg) => ({
        url: `/v1/orgs/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.createOrg,
      }),
    }),
    getOrgUsers: build.query<GetOrgUsersApiResponse, GetOrgUsersApiArg>({
      query: (queryArg) => ({ url: `/v1/orgs/${queryArg.id}/users` }),
    }),
    updateOrgUsers: build.mutation<
      UpdateOrgUsersApiResponse,
      UpdateOrgUsersApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/orgs/${queryArg.id}/users`,
        method: 'PATCH',
        body: queryArg.userPermissionsList,
      }),
    }),
    removeOrgUser: build.mutation<
      RemoveOrgUserApiResponse,
      RemoveOrgUserApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/orgs/${queryArg.id}/users/${queryArg.userid}`,
        method: 'DELETE',
      }),
    }),
    orgSwitch: build.mutation<OrgSwitchApiResponse, OrgSwitchApiArg>({
      query: (queryArg) => ({
        url: `/v1/orgs/${queryArg.id}/switch`,
        method: 'PUT',
      }),
    }),
    policySubscriptions: build.mutation<
      PolicySubscriptionsApiResponse,
      PolicySubscriptionsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/orgs/policy-subscriptions`,
        method: 'PATCH',
        body: queryArg.policySubscriptionList,
      }),
    }),
    createPolicy: build.mutation<CreatePolicyApiResponse, CreatePolicyApiArg>({
      query: (queryArg) => ({
        url: `/v1/policies`,
        method: 'POST',
        body: queryArg.createPolicy,
      }),
    }),
    listPolicies: build.query<ListPoliciesApiResponse, ListPoliciesApiArg>({
      query: (queryArg) => ({
        url: `/v1/policies`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
          category_id: queryArg.categoryId,
          compliance_id: queryArg.complianceId,
          datasource_id: queryArg.datasourceId,
          datasource_type: queryArg.datasourceType,
          resource_id: queryArg.resourceId,
          severity_label: queryArg.severityLabel,
          name: queryArg.name,
          only_failed: queryArg.onlyFailed,
          secberus_managed: queryArg.secberusManaged,
          subscribed: queryArg.subscribed,
        },
      }),
    }),
    getPolicy: build.query<GetPolicyApiResponse, GetPolicyApiArg>({
      query: (queryArg) => ({ url: `/v1/policies/${queryArg.id}` }),
    }),
    deletePolicy: build.mutation<DeletePolicyApiResponse, DeletePolicyApiArg>({
      query: (queryArg) => ({
        url: `/v1/policies/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    updatePolicy: build.mutation<UpdatePolicyApiResponse, UpdatePolicyApiArg>({
      query: (queryArg) => ({
        url: `/v1/policies/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.createPolicy,
      }),
    }),
    getPolicyCoverage: build.query<
      GetPolicyCoverageApiResponse,
      GetPolicyCoverageApiArg
    >({
      query: (queryArg) => ({ url: `/v1/policies/${queryArg.id}/coverage` }),
    }),
    setPolicyCoverage: build.mutation<
      SetPolicyCoverageApiResponse,
      SetPolicyCoverageApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/policies/${queryArg.id}/coverage`,
        method: 'PUT',
        body: queryArg.setPolicyCoverage,
      }),
    }),
    getPolicySubscriptions: build.query<
      GetPolicySubscriptionsApiResponse,
      GetPolicySubscriptionsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/policies/${queryArg.id}/subscription`,
      }),
    }),
    listUsers: build.query<ListUsersApiResponse, ListUsersApiArg>({
      query: (queryArg) => ({
        url: `/v1/users`,
        params: {
          sort_by: queryArg.sortBy,
          limit: queryArg.limit,
          page: queryArg.page,
          org_id: queryArg.orgId,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as secberusApi };
export type GetOpenApiSpecApiResponse = /** status 200 200 response */ {
  [key: string]: any;
};
export type GetOpenApiSpecApiArg = void;
export type GetHealthcheckApiResponse = unknown;
export type GetHealthcheckApiArg = void;
export type LoginCallbackApiResponse = /** status 201 201 response */ undefined;
export type LoginCallbackApiArg = {
  email: Email;
};
export type GetSsoConfigApiResponse = /** status 200 200 response */ IsSso;
export type GetSsoConfigApiArg = {
  email: string;
};
export type GetAuthTokenApiResponse =
  /** status 200 200 response */ CredentialResponse;
export type GetAuthTokenApiArg = {
  credentialLogin: CredentialLogin;
};
export type ListCategoriesApiResponse =
  /** status 200 200 response */ CategoryList;
export type ListCategoriesApiArg = {
  sortBy?: string[];
  limit?: number;
  page?: number;
};
export type GetCategoryApiResponse =
  /** status 200 200 response */ CategoryWithPolicies;
export type GetCategoryApiArg = {
  id: string;
};
export type DeleteCategoryApiResponse =
  /** status 200 200 response */ undefined;
export type DeleteCategoryApiArg = {
  id: string;
  replacementCategoryId?: string;
};
export type UpdateCategoryApiResponse = /** status 200 200 response */ Category;
export type UpdateCategoryApiArg = {
  id: string;
  createCategory: CreateCategory;
};
export type ListCompliancesApiResponse =
  /** status 200 200 response */ ComplianceList;
export type ListCompliancesApiArg = {
  sortBy?: string[];
  limit?: number;
  page?: number;
};
export type CreateComplianceApiResponse =
  /** status 200 200 response */ Compliance;
export type CreateComplianceApiArg = {
  createCompliance: CreateCompliance;
};
export type SummarizeCompliancesApiResponse =
  /** status 200 200 response */ ComplianceSummary;
export type SummarizeCompliancesApiArg = {
  sortBy?: string[];
  limit?: number;
  page?: number;
};
export type ListComplianceLibraryApiResponse =
  /** status 200 200 response */ ComplianceLibrary;
export type ListComplianceLibraryApiArg = {
  sortBy?: string[];
  limit?: number;
  page?: number;
};
export type GetComplianceApiResponse =
  /** status 200 200 response */ Compliance;
export type GetComplianceApiArg = {
  id: string;
};
export type DeleteComplianceApiResponse =
  /** status 200 200 response */ ComplianceUpdated;
export type DeleteComplianceApiArg = {
  id: string;
};
export type UpdateComplianceApiResponse =
  /** status 200 200 response */ Compliance;
export type UpdateComplianceApiArg = {
  id: string;
  updateCompliance: UpdateCompliance;
};
export type ToggleComplianceApiResponse =
  /** status 200 200 response */ ToggleComplianceResults;
export type ToggleComplianceApiArg = {
  id: string;
  toggleCompliance: ToggleCompliance;
};
export type ComputeComplianceScoreApiResponse =
  /** status 200 200 response */ ComplianceScore;
export type ComputeComplianceScoreApiArg = {
  id: string;
  computeComplianceScore: ComputeComplianceScore;
};
export type SetComplianceVisibilityApiResponse =
  /** status 200 200 response */ ComplianceUpdated;
export type SetComplianceVisibilityApiArg = {
  id: string;
  setComplianceVisibility: SetComplianceVisibility;
};
export type PublishComplianceApiResponse =
  /** status 200 200 response */ ComplianceUpdated;
export type PublishComplianceApiArg = {
  id: string;
  publishCompliance: PublishCompliance;
};
export type AddPolicyComplianceApiResponse =
  /** status 200 200 response */ ComplianceUpdated;
export type AddPolicyComplianceApiArg = {
  id: string;
  addPolicyCompliance: AddPolicyCompliance;
};
export type RemovePolicyComplianceApiResponse =
  /** status 200 200 response */ ComplianceUpdated;
export type RemovePolicyComplianceApiArg = {
  id: string;
  removePolicyCompliance: RemovePolicyCompliance;
};
export type AddControlComplianceApiResponse =
  /** status 200 200 response */ ComplianceUpdated;
export type AddControlComplianceApiArg = {
  id: string;
  addControlCompliance: AddControlCompliance;
};
export type GetControlApiResponse = /** status 200 200 response */ Control;
export type GetControlApiArg = {
  id: string;
  ccid: string;
};
export type RemoveControlComplianceApiResponse =
  /** status 200 200 response */ ComplianceUpdated;
export type RemoveControlComplianceApiArg = {
  id: string;
  ccid: string;
};
export type ListDataSourcesApiResponse =
  /** status 200 200 response */ DatasourceList;
export type ListDataSourcesApiArg = {
  sortBy?: string[];
  limit?: number;
  page?: number;
};
export type ListSavedQueriesApiResponse =
  /** status 200 200 response */ SavedSqlQueryList;
export type ListSavedQueriesApiArg = {
  sortBy?: string[];
  limit?: number;
  page?: number;
};
export type SaveQueryApiResponse = /** status 200 200 response */ SavedSqlQuery;
export type SaveQueryApiArg = {
  saveSqlQuery: SaveSqlQuery;
};
export type RunQueryApiResponse = /** status 200 200 response */ SqlQueryResult;
export type RunQueryApiArg = {
  sortBy?: string[];
  limit?: number;
  page?: number;
  datasourceId?: string;
  sqlQuery: SqlQuery;
};
export type GetSavedQueryApiResponse =
  /** status 200 200 response */ SavedSqlQuery;
export type GetSavedQueryApiArg = {
  id: string;
};
export type EditQueryApiResponse = /** status 200 200 response */ SavedSqlQuery;
export type EditQueryApiArg = {
  id: string;
  saveSqlQuery: SaveSqlQuery;
};
export type DeleteQueryApiResponse = /** status 200 200 response */ undefined;
export type DeleteQueryApiArg = {
  id: string;
};
export type GetTableDataApiResponse = /** status 200 200 response */ TableData;
export type GetTableDataApiArg = {
  id: string;
  sortBy?: string[];
  limit?: number;
  page?: number;
};
export type ListTablesApiResponse = /** status 200 200 response */ TableList;
export type ListTablesApiArg = void;
export type ListViewsApiResponse = /** status 200 200 response */ ViewList;
export type ListViewsApiArg = {
  sortBy?: string[];
  limit?: number;
  page?: number;
};
export type SaveViewApiResponse = /** status 200 200 response */ View;
export type SaveViewApiArg = {
  saveView: SaveView;
};
export type GetViewApiResponse = /** status 200 200 response */ View;
export type GetViewApiArg = {
  id: string;
};
export type UpdateViewApiResponse = /** status 200 200 response */ View;
export type UpdateViewApiArg = {
  id: string;
  saveView: SaveView;
};
export type DeleteViewApiResponse = /** status 200 200 response */ undefined;
export type DeleteViewApiArg = {
  id: string;
};
export type ListOrgsApiResponse = /** status 200 200 response */ OrgList;
export type ListOrgsApiArg = {
  sortBy?: string[];
  limit?: number;
  page?: number;
};
export type CreateOrgApiResponse = /** status 200 200 response */ Org;
export type CreateOrgApiArg = {
  createOrg: CreateOrg;
};
export type GetOrgApiResponse = /** status 200 200 response */ Org;
export type GetOrgApiArg = {
  id: string;
};
export type DeleteOrgApiResponse = /** status 200 200 response */ undefined;
export type DeleteOrgApiArg = {
  id: string;
};
export type UpdateOrgApiResponse = /** status 200 200 response */ Org;
export type UpdateOrgApiArg = {
  id: string;
  createOrg: CreateOrg;
};
export type GetOrgUsersApiResponse = /** status 200 200 response */ UserList;
export type GetOrgUsersApiArg = {
  id: string;
};
export type UpdateOrgUsersApiResponse =
  /** status 200 200 response */ undefined;
export type UpdateOrgUsersApiArg = {
  id: string;
  userPermissionsList: UserPermissionsList;
};
export type RemoveOrgUserApiResponse = /** status 200 200 response */ undefined;
export type RemoveOrgUserApiArg = {
  id: string;
  userid: string;
};
export type OrgSwitchApiResponse = /** status 200 200 response */ UserList;
export type OrgSwitchApiArg = {
  id: string;
};
export type PolicySubscriptionsApiResponse =
  /** status 200 200 response */ undefined;
export type PolicySubscriptionsApiArg = {
  policySubscriptionList: PolicySubscriptionList;
};
export type CreatePolicyApiResponse = /** status 200 200 response */ Policy;
export type CreatePolicyApiArg = {
  createPolicy: CreatePolicy;
};
export type ListPoliciesApiResponse = /** status 200 200 response */ PolicyList;
export type ListPoliciesApiArg = {
  sortBy?: string[];
  limit?: number;
  page?: number;
  categoryId?: string[];
  complianceId?: string[];
  datasourceId?: string[];
  datasourceType?: string[];
  resourceId?: string[];
  severityLabel?: string[];
  name?: string;
  onlyFailed?: boolean;
  secberusManaged?: boolean;
  subscribed?: boolean;
};
export type GetPolicyApiResponse = /** status 200 200 response */ Policy;
export type GetPolicyApiArg = {
  id: string;
};
export type DeletePolicyApiResponse = /** status 200 200 response */ undefined;
export type DeletePolicyApiArg = {
  id: string;
};
export type UpdatePolicyApiResponse = /** status 200 200 response */ Policy;
export type UpdatePolicyApiArg = {
  id: string;
  createPolicy: CreatePolicy;
};
export type GetPolicyCoverageApiResponse =
  /** status 200 200 response */ PolicyCoverage;
export type GetPolicyCoverageApiArg = {
  id: string;
};
export type SetPolicyCoverageApiResponse =
  /** status 200 200 response */ undefined;
export type SetPolicyCoverageApiArg = {
  id: string;
  setPolicyCoverage: SetPolicyCoverage;
};
export type GetPolicySubscriptionsApiResponse =
  /** status 200 200 response */ PolicySubscriptionList;
export type GetPolicySubscriptionsApiArg = {
  id: string;
};
export type ListUsersApiResponse = /** status 200 200 response */ CategoryList;
export type ListUsersApiArg = {
  sortBy?: string[];
  limit?: number;
  page?: number;
  orgId?: string;
};
export type ApiErrorSchema = {
  requestid?: string;
  link?: string;
  http_status?: number;
  detail?: string;
  title?: string;
};
export type Email = {
  email: string;
};
export type IsSso = {
  sso: boolean;
  client_id?: string;
  provider?: string;
};
export type CredentialResponse = {
  AccessToken?: string;
  ExpiresIn?: number;
  IdToken?: string;
  RefreshToken?: string;
  TokenType?: string;
};
export type CredentialLogin = {
  email: string;
  password: string;
};
export type Cursor = {
  total: number;
  pages: number;
  limit: number;
  page: number;
  sort_by?: string[];
};
export type Category = {
  policy_count?: number;
  org_id?: string;
  name: string;
  secberus_managed: boolean;
  id: string;
};
export type CategoryList = {
  cursor: Cursor;
  results: Category[];
};
export type PolicyControl = {
  id: string;
  identifier?: string;
  compliance_name?: string;
  compliance_id?: string;
};
export type Policy = {
  id: string;
  label: string;
  name: string;
  description: string;
  rationale?: string;
  logic?: string;
  remediation_steps?: string;
  violation_summary_tmpl?: string;
  severity: number;
  secberus_managed: boolean;
  subscribed: boolean;
  policy_category_id?: string;
  policy_category_name?: string;
  datasource_types?: string[];
  resource_types?: string[];
  resource_id?: string;
  language: string;
  query?: string;
  sanitized_query?: string;
  parameters?: {
    [key: string]: any;
  };
  org_id?: string;
  ctime?: string;
  mtime?: string;
  score?: number;
  violation_count?: number;
  total_violation_count?: number;
  controls?: PolicyControl[];
};
export type CategoryWithPolicies = {
  policies: Policy[];
  org_id?: string;
  name: string;
  secberus_managed: boolean;
  id: string;
};
export type CreateCategory = {
  name: string;
};
export type Control = {
  id: string;
  ordinal: string;
  identifier: string;
  description?: string;
  depth: number;
  path?: string;
  control_order?: number;
  compliance_id?: string;
  children?: Control[];
  parent?: string;
  policy_ids?: string[];
  policies?: {
    id?: string;
    name?: string;
    severity?: number;
    violation_count?: number;
  }[];
};
export type Compliance = {
  id: string;
  name: string;
  description: string;
  url: string;
  secberus_managed?: boolean;
  version: string;
  update_timestamp?: string;
  full_org_coverage: boolean;
  published: boolean;
  children?: Control[];
};
export type ComplianceList = {
  cursor: Cursor;
  results: Compliance[];
};
export type CreateCompliance = {
  name: string;
  description: string;
  url: string;
  secberus_managed?: boolean;
  version: string;
  full_org_coverage: boolean;
  published: boolean;
};
export type ComplianceSummaryData = {
  id: string;
  name: string;
  compliance_summary: number;
};
export type ComplianceSummary = {
  cursor: Cursor;
  results: ComplianceSummaryData[];
};
export type ComplianceLibraryEntry = {
  id?: string;
  name: string;
  version: string;
  update_timestamp: string;
  published: boolean;
  policy_count: number;
};
export type ComplianceLibrary = {
  cursor: Cursor;
  results: ComplianceLibraryEntry[];
};
export type ComplianceUpdated = {
  id: string;
  status: string;
};
export type UpdateCompliance = {
  name?: string;
  description?: string;
  url?: string;
  version: string;
  update_timestamp?: string;
  full_org_coverage?: boolean;
};
export type ToggleComplianceResults = {
  framework: string;
  org: string;
  subscribed: string[];
  unsubscribed: string[];
};
export type ToggleCompliance = {
  enabled: boolean;
};
export type ComplianceScoreQueryResultPolicy = {
  id: string;
  name: string;
  severity: number;
  violation_count: number;
};
export type ComplianceScoreQueryResult = {
  id?: string;
  ordinal?: string;
  order?: number;
  depth?: number;
  path?: string;
  name?: string;
  description?: string;
  url?: string;
  identifier?: string;
  secberus_managed?: boolean;
  version?: string;
  update_timestamp?: string;
  full_org_coverage?: boolean;
  enabled?: boolean;
  parent?: string;
  policies: {
    [key: string]: ComplianceScoreQueryResultPolicy;
  };
  violations?: string[];
  violation_count: number;
  policy_count: number;
  failed_policy_count: number;
  children?: ComplianceScoreQueryResult[];
};
export type ComplianceScore = {
  id?: string;
  name?: string;
  children?: ComplianceScoreQueryResult[];
  compliance_score?: number;
  control_count?: number;
  depth?: number;
  description?: string;
  enabled?: boolean;
  failed_control_count?: number;
  failed_policy_count?: number;
  full_org_coverage?: boolean;
  policies?: {
    [key: string]: ComplianceScoreQueryResultPolicy;
  };
  policy_count?: number;
  secberus_managed?: boolean;
  update_timestamp?: string;
  version?: string;
  violation_count?: number;
};
export type ComputeComplianceScore = {
  datasource_id?: string[];
  datasource_type?: string[];
  resource_id?: string[];
  resource_data?: string[];
};
export type SetComplianceVisibility = {
  mandatory_orgs: string[];
  optional_orgs: string[];
};
export type PublishCompliance = {
  published: boolean;
};
export type AddPolicyCompliance = {
  policy_id: string;
  control_id: string;
};
export type RemovePolicyCompliance = {
  policy_id: string;
  control_id: string;
};
export type AddControlCompliance = {
  ordinal: string;
  identifier: string;
  description?: string;
  parent: string;
  control_order: number;
};
export type Datasource = {
  id: string;
  name: string;
  type: string;
};
export type DatasourceList = {
  cursor: Cursor;
  results: Datasource[];
};
export type SavedSqlQuery = {
  id: string;
  name: string;
  query: string;
  description?: string;
  parameters?: {
    [key: string]: any;
  };
};
export type SavedSqlQueryList = {
  cursor: Cursor;
  results: SavedSqlQuery[];
};
export type SaveSqlQuery = {
  id?: string;
  name: string;
  query: string;
  description?: string;
  parameters?: {
    [key: string]: any;
  };
};
export type SqlQueryResult = {
  cursor: Cursor;
  results: {
    [key: string]: any;
  }[];
};
export type SqlQuery = {
  query: string;
  parameters?: {
    [key: string]: any;
  };
};
export type TableData = {
  results: {
    [key: string]: any;
  }[];
  cursor: Cursor;
};
export type TableColumn = {
  column_name: string;
  data_type: string;
  is_nullable?: boolean;
};
export type Table = {
  name: string;
  row_count: number;
  columns: TableColumn[];
};
export type TableList = Table[];
export type View = {
  id: string;
  name: string;
  query: string;
  description?: string;
  secberus_managed: boolean;
  owner_id?: string;
};
export type ViewList = {
  cursor: Cursor;
  results: View[];
};
export type SaveView = {
  id?: string;
  name: string;
  query: string;
  description?: string;
};
export type Org = {
  user_count?: number;
  datasource_count?: number;
  name: string;
  description?: string;
  id: string;
};
export type OrgList = {
  cursor: Cursor;
  results: Org[];
};
export type CreateOrg = {
  name: string;
  description?: string;
};
export type User = {
  id: string;
  email: string;
};
export type UserList = {
  cursor: Cursor;
  results: User[];
};
export type UserPermissions = {
  user_id: string;
  org_id: string;
  role_id: string;
};
export type UserPermissionsList = UserPermissions[];
export type PolicySubscription = {
  policy_id: string;
  enabled: boolean;
  control_id?: string;
  mandatory?: boolean;
};
export type PolicySubscriptionList = PolicySubscription[];
export type CreatePolicy = {
  id?: string;
  label: string;
  name: string;
  description: string;
  rationale?: string;
  logic?: string;
  remediation_steps?: string;
  violation_summary_tmpl: string;
  severity?: number;
  policy_category_id: string;
  resource_id?: string;
  language?: 'SQL';
  query: string;
  enabled?: boolean;
  controls?: PolicyControl[];
};
export type PolicyList = {
  cursor: Cursor;
  results: Policy[];
};
export type PolicyShort = {
  id: string;
  name: string;
  label: string;
};
export type PolicyCoverageDatasource = {
  id: string;
  name: string;
  type: string;
  policy_last_run?: number;
  policy_run_status?: boolean;
};
export type PolicyCoverage = {
  policy: PolicyShort;
  datasources: PolicyCoverageDatasource[];
};
export type SetPolicyCoverage = {
  datasources: {
    id: string;
    name?: string;
  }[];
};
export const {
  useGetOpenApiSpecQuery,
  useGetHealthcheckQuery,
  useGetSsoConfigQuery,
  useListCategoriesQuery,
  useGetCategoryQuery,
  useListCompliancesQuery,
  useSummarizeCompliancesQuery,
  useListComplianceLibraryQuery,
  useGetComplianceQuery,
  useComputeComplianceScoreQuery,
  useGetControlQuery,
  useListDataSourcesQuery,
  useListSavedQueriesQuery,
  useGetSavedQueryQuery,
  useGetTableDataQuery,
  useListTablesQuery,
  useListViewsQuery,
  useGetViewQuery,
  useListOrgsQuery,
  useGetOrgQuery,
  useGetOrgUsersQuery,
  useListPoliciesQuery,
  useGetPolicyQuery,
  useGetPolicyCoverageQuery,
  useGetPolicySubscriptionsQuery,
  useListUsersQuery,
} = injectedRtkApi;
