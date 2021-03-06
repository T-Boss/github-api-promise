const config = require('../config');
const req = require('../request-helpers');


/**
 * Teams module
 * 
 * This API is only available to authenticated members of the team's organization. OAuth access tokens require the read:org scope.
 * 
 * @module teams/teams
 */
module.exports = {

	/**
	 * List teams
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#list-teams}
	 * 
	 * @param {string} org         - The organization
	 * @param {object} params      - An object of parameters for the request
	 * @param {int}    params.page - The page of results to retrieve
	 *
	 * @return {object} team data
	 */
	getTeams: function(org, params) {
		return req.standardRequest(`${config.host}/orgs/${org}/teams?${req.assembleQueryParams(params,
			['page'])}`);
	},

	/**
	 * Get team
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#get-team}
	 * 
	 * @param {string} id - The team id
	 *
	 * @return {object} team data
	 */
	getTeam: function(id, params) {
		return req.standardRequest(`${config.host}/teams/${id}`);
	},

	/**
	 * Create team
	 * 
	 * To create a team, the authenticated user must be a member of :org.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#create-team}
	 * 
	 * @param {string}   org                 - The organization
	 * @param {object}   body                - The request body
	 * @param {string}   body.name           - Required. The name of the team.
	 * @param {string}   body.description    - The description of the team.
	 * @param {string[]} body.maintainers    - The logins of organization members to add as maintainers of the team.
	 * @param {string[]} body.repo_names     - The full name (e.g., "organization-name/repository-name") of repositories to add the team to.
	 * @param {string}   body.privacy        - The level of privacy this team should have. The options are:
	 * 
	 * **For a non-nested team:**
	 * * `secret` - only visible to organization owners and members of this team. 
	 * * `closed` - visible to all members of this organization. 
	 * 
	 * Default: `secret` 
	 * 
	 * **For a `parent` or child team:**
	 * * `closed` - visible to all members of this organization. 
	 * 
	 * Default for child team: `closed` 
	 * 
	 * Note: You must pass the hellcat-preview media type to set privacy default to `closed` for child teams. 
	 * 
	 * @param {string}   body.permission     - **Deprecated.** The permission that new repositories will be added to the team with when none is specified. Can be one of:
	 * * `pull` - team members can pull, but not push to or administer newly-added repositories.
	 * * `push` - team members can pull and push, but not administer newly-added repositories.
	 * * `admin` - team members can pull, push and administer newly-added repositories.
	 * 
	 * Default: `pull`
	 * 
	 * @param {int}      body.parent_team_id - The ID of a team to set as the parent team. Note: You must pass the hellcat-preview media type to use this parameter.
	 *
	 * @return {object} team data
	 */
	createTeam: function(org, body) {
		return req.standardRequest(`${config.host}/orgs/${org}/teams`, 'post', body);
	},

	/**
	 * Edit team
	 * 
	 * To edit a team, the authenticated user must either be an owner of the org that the team is associated with, or a maintainer of the team.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#edit-team}
	 * 
	 * @param {string}   id                  - The team ID
	 * @param {object}   body                - The request body
	 * @param {string}   body.name           - Required. The name of the team.
	 * @param {string}   body.description    - The description of the team.
	 * @param {string}   body.privacy        - The level of privacy this team should have. The options are:
	 * 
	 * **For a non-nested team:**
	 * * `secret` - only visible to organization owners and members of this team. 
	 * * `closed` - visible to all members of this organization. 
	 * 
	 * **For a `parent` or child team:**
	 * * `closed` - visible to all members of this organization. 
	 * @param {string}   body.permission     - **Deprecated.** The permission that new repositories will be added to the team with when none is specified. Can be one of:
	 * * `pull` - team members can pull, but not push to or administer newly-added repositories.
	 * * `push` - team members can pull and push, but not administer newly-added repositories.
	 * * `admin` - team members can pull, push and administer newly-added repositories.
	 * 
	 * Default: `pull`
	 * @param {int}      body.parent_team_id - The ID of a team to set as the parent team. Note: You must pass the hellcat-preview media type to use this parameter.
	 *
	 * @return {object} team data
	 */
	editTeam: function(id, body) {
		return req.standardRequest(`${config.host}/teams/${id}`, 'patch', body);
	},

	/**
	 * Delete team
	 * 
	 * To delete a team, the authenticated user must be a team maintainer or an owner of the org associated with the team. If you are an organization owner and you pass the hellcat-preview media type, deleting a parent team will delete all of its child teams as well.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#delete-team}
	 * 
	 * @param {string} id - The team ID
	 *
	 * @return {nothing}
	 */
	deleteTeam: function(id) {
		return req.standardRequest(`${config.host}/teams/${id}`, 'delete');
	},

	/**
	 * List child teams
	 * 
	 * At this time, the hellcat-preview media type is required to use this endpoint.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#list-child-teams}
	 * 
	 * @param {string} id          - The team ID
	 * @param {object} params      - An object of parameters for the request
	 * @param {int}    params.page - The page of results to retrieve
	 *
	 * @return {object} team data
	 */
	getChildTeams: function(id, params) {
		return req.standardRequest(`${config.host}/teams/${id}/teams?${req.assembleQueryParams(params,
			['page'])}`);
	},

	/**
	 * List team repos
	 * 
	 * Note: If you pass the hellcat-preview media type, the response will include any repositories inherited through a parent team.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#list-team-repos}
	 * 
	 * @param {string} id          - The team ID
	 * @param {object} params      - An object of parameters for the request
	 * @param {int}    params.page - The page of results to retrieve
	 *
	 * @return {object} team data
	 */
	getTeamRepos: function(id, params) {
		return req.standardRequest(`${config.host}/teams/${id}/repos?${req.assembleQueryParams(params,
			['page'])}`);
	},

	/**
	 * Check if a team manages a repository
	 * 
	 * Note: If you pass the hellcat-preview media type, repositories inherited through a parent team will be checked.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#check-if-a-team-manages-a-repository}
	 * 
	 * @param {string} id    - The team ID
	 * @param {string} owner - The owner name
	 * @param {string} repo  - The repo name
	 *
	 * @return {nothing} 204 if is managed, 404 if not
	 */
	getIsRepoManagedByTeam: function(id, owner, repo) {
		return req.standardRequest(`${config.host}/teams/${id}/repos/${owner}/${repo}`);
	},

	/**
	 * Add or update team repository
	 * 
	 * To add a repository to a team or update the team's permission on a repository, the authenticated user must have admin access to the repository, and must be able to see the team. The repository must be owned by the organization, or a direct fork of a repository owned by the organization. If you pass the hellcat-preview media type, you can modify repository permissions of child teams.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#add-or-update-team-repository}
	 * 
	 * @param {string} id              - The team ID
	 * @param {string} owner           - The owner name
	 * @param {string} repo            - The repo name
	 * @param {object} body            - The request body
	 * @param {string} body.permission - The permission to grant the team on this repository. Can be one of:
	 * * `pull` - team members can pull, but not push to or administer this repository.
	 * * `push` - team members can pull and push, but not administer this repository.
	 * * `admin` - team members can pull, push and administer this repository.
	 * 
	 * If no permission is specified, the team's `permission` attribute will be used to determine what permission to grant the team on this repository.
	 * 
	 * **Note**: If you pass the `hellcat-preview` media type, you can promote—but not demote—a `permission` attribute inherited through a parent team.
	 *
	 * @return {nothing}
	 */
	updateTeamRepository: function(id, owner, repo, body) {
		return req.standardRequest(`${config.host}/teams/${id}/repos/${owner}/${repo}`, 'put', body);
	},

	/**
	 * Remove team repository
	 * 
	 * If the authenticated user is an organization owner or a team maintainer, they can remove any repositories from the team. To remove a repository from a team as an organization member, the authenticated user must have admin access to the repository and must be able to see the team. NOTE: This does not delete the repository, it just removes it from the team.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#remove-team-repository}
	 * 
	 * @param {string} id    - The team ID
	 * @param {string} owner - The owner name
	 * @param {string} repo  - The repo name
	 *
	 * @return {nothing}
	 */
	removeTeamRepository: function(id, owner, repo) {
		return req.standardRequest(`${config.host}/teams/${id}/repos/${owner}/${repo}`, 'delete');
	},

	/**
	 * List user teams
	 * 
	 * List all of the teams across all of the organizations to which the authenticated user belongs. This method requires user, repo, or read:org scope when authenticating via OAuth.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#}
	 * 
	 * @param {object} params      - An object of parameters for the request
	 * @param {int}    params.page - The page of results to retrieve
	 *
	 * @return {object} team data
	 */
	getUserTeams: function(params) {
		return req.standardRequest(`${config.host}/user/teams?${req.assembleQueryParams(params,
			['page'])}`);
	},

	/**
	 * List team projects
	 * 
	 * Lists the organization projects for a team. If you pass the hellcat-preview media type, the response will include projects inherited from a parent team.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#list-team-projects}
	 * 
	 * @param {string} id          - The team ID
	 * @param {object} params      - An object of parameters for the request
	 * @param {int}    params.page - The page of results to retrieve
	 *
	 * @return {object} project data
	 */
	getTeamProjects: function(id, params) {
		return req.standardRequest(`${config.host}/teams/${id}/projects?${req.assembleQueryParams(params,
			['page'])}`);
	},

	/**
	 * Review a team project
	 * 
	 * Checks whether a team has read, write, or admin permissions for an organization project. If you pass the hellcat-preview media type, the response will include projects inherited from a parent team.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#review-a-team-project}
	 * 
	 * @param {string} id        - The team ID
	 * @param {string} projectId - The project ID
	 *
	 * @return {object} team data
	 */
	getTeamProject: function(id, projectId) {
		return req.standardRequest(`${config.host}/teams/${id}/projects/${projectId}`);
	},

	/**
	 * Add or update team project
	 * 
	 * Adds an organization project to a team. To add a project to a team or update the team's permission on a project, the authenticated user must have admin permissions for the project. The project and team must be part of the same organization.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#add-or-update-team-project}
	 * 
	 * @param {string} id              - The team ID
	 * @param {string} projectId       - The project ID
	 * @param {object} body            - The request body
	 * @param {string} body.permission - The permission to grant to the team for this project. Can be one of:
	 * * `read` - team members can read, but not write to or administer this project.
	 * * `write` - team members can read and write, but not administer this project.
	 * * `admin` - team members can read, write and administer this project.
	 * 
	 * Default: the team's `permission` attribute will be used to determine what permission to grant the team on this project. Note that, if you choose not to pass any parameters, you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "HTTP verbs."
	 * 
	 * **Note**: If you pass the `hellcat-preview` media type, you can promote—but not demote—a `permission` attribute inherited from a parent team.
	 *
	 * @return {nothing}
	 */
	updateTeamProject: function(id, projectId, body) {
		return req.standardRequest(`${config.host}/teams/${id}/projects/${projectId}`, 'put', body);
	},

	/**
	 * Remove team project
	 * 
	 * Removes an organization project from a team. An organization owner or a team maintainer can remove any project from the team. To remove a project from a team as an organization member, the authenticated user must have read access to both the team and project, or admin access to the team or project. Note: This endpoint removes the project from the team, but does not delete it.
	 * 
	 * @see {@link https://developer.github.com/v3/teams/#remove-team-project}
	 * 
	 * @param {string} id        - The team ID
	 * @param {string} projectId - The project ID
	 *
	 * @return {nothing}
	 */
	removeTeamProject: function(id, projectId) {
		return req.standardRequest(`${config.host}/teams/${id}/projects/${projectId}`, 'delete');
	},
};
