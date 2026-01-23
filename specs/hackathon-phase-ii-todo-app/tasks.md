# Tasks: Hackathon Phase II - Todo Full-Stack Web Application

**Input**: Design documents from `/specs/hackathon-phase-ii-todo-app/`
**Prerequisites**: plan.md (complete), spec.md (complete)

**Tests**: Tests are included as the specification requires thorough validation of authentication, authorization, and data integrity.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story per priority (P1 → P2 → P3).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US5)
- Includes exact file paths per plan.md structure

## Path Conventions

- **Web app structure**: `backend/` and `frontend/` at repository root
- Backend paths: `backend/app/`, `backend/tests/`
- Frontend paths: `frontend/src/`, `frontend/tests/`

---

## Phase 0: Setup (Shared Infrastructure)

**Purpose**: Project initialization, directory structure, and basic configuration

- [X] T001 Create monorepo directory structure (backend/, frontend/, docker-compose.yml)
- [X] T002 [P] Initialize backend: create backend/app/ subdirectories (models/, routers/, services/, schemas/)
- [X] T003 [P] Initialize frontend: create frontend/src/ subdirectories (app/, components/, lib/, hooks/, context/, types/)
- [X] T004 [P] Create backend/requirements.txt with FastAPI, SQLModel, python-jose, passlib, psycopg2-binary
- [X] T005 [P] Create frontend/package.json with Next.js 16+, React 18+, Tailwind CSS, Better Auth
- [X] T006 [P] Create .env.example templates for backend (DATABASE_URL, BETTER_AUTH_SECRET, JWT_ALGORITHM, JWT_EXPIRE_MINUTES, CORS_ORIGINS)
- [X] T007 [P] Create .env.local.example template for frontend (NEXT_PUBLIC_API_URL, NEXT_PUBLIC_BETTER_AUTH_SECRET)
- [X] T008 [P] Create docker-compose.yml with backend, frontend, and migrations services
- [X] T009 [P] Create backend/.gitignore (exclude .env, __pycache__, .pytest_cache)
- [X] T010 [P] Create frontend/.gitignore (exclude .env.local, node_modules, .next)

**Checkpoint**: Project structure initialized, dependencies defined, environment templates ready

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Backend Foundation

- [X] T011 Configure database connection in backend/app/database.py (Neon connection string, SQLModel engine, session management)
- [X] T012 Create backend/app/config.py (load environment variables, Settings class with DATABASE_URL, BETTER_AUTH_SECRET, JWT_ALGORITHM, JWT_EXPIRE_MINUTES, CORS_ORIGINS)
- [X] T013 Create backend/app/main.py (FastAPI app instance, CORS middleware with whitelisted origins, include routers)
- [X] T014 [P] Initialize Alembic in backend/ (alembic init alembic, configure alembic.ini and env.py for SQLModel)
- [X] T015 [P] Create backend/app/dependencies.py (JWT verification dependency function get_current_user: decode token, validate signature, extract user_id, return User object or 401)

### Frontend Foundation

- [X] T016 Configure Tailwind CSS in frontend/tailwind.config.js (mobile-first breakpoints: 375px, 768px, 1440px; design tokens: colors, spacing, typography)
- [X] T017 Create frontend/next.config.js (configure API base URL, environment variables, image optimization)
- [X] T018 Create frontend/src/lib/api.ts (fetch wrapper with JWT token from localStorage, Authorization header, error handling for 400/401/403/404)
- [X] T019 [P] Create frontend/src/lib/auth.ts (Better Auth client configuration with JWT plugin, signup/signin functions)
- [X] T020 [P] Create frontend/src/context/AuthContext.tsx (React Context for auth state: user, token, login, logout, signup; persist token to localStorage)
- [X] T021 Create frontend/src/app/layout.tsx (root layout with AuthContext provider, Tailwind CSS imports, metadata)

### Shared UI Components (Frontend)

- [X] T022 [P] Create frontend/src/components/ui/Button.tsx (reusable button with variants: primary, secondary, disabled; Tailwind styling)
- [X] T023 [P] Create frontend/src/components/ui/Input.tsx (reusable input with label, error message, validation states)
- [X] T024 [P] Create frontend/src/components/ui/Modal.tsx (reusable modal with open/close animation, backdrop, close button)
- [X] T025 [P] Create frontend/src/components/ui/Card.tsx (reusable card component for task display)
- [X] T026 [P] Create frontend/src/components/LoadingSpinner.tsx (loading indicator for async operations)

**Checkpoint**: Foundation ready - database connected, JWT middleware configured, auth context set up, base UI components created. User story implementation can now begin in parallel.

---

## Phase 2: User Story 1 - User Registration and Authentication (Priority: P1) 🎯 MVP

**Goal**: Implement secure user signup and signin with JWT token issuance, enabling authenticated access to protected routes

**Independent Test**: Create account via /signup → receive JWT token → signin with credentials → verify token stored in localStorage → access protected route successfully → expired/invalid tokens rejected

### Backend Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T027 [P] [US1] Contract test for POST /api/auth/signup in backend/tests/test_auth.py (verify 201 response, JWT token in response, password hashed in DB)
- [X] T028 [P] [US1] Contract test for POST /api/auth/signin in backend/tests/test_auth.py (verify 200 response, JWT token valid, invalid credentials return 401)
- [X] T029 [P] [US1] Integration test for JWT middleware in backend/tests/test_auth.py (verify valid token passes, expired token returns 401, malformed token returns 401)

### Backend Implementation for User Story 1

- [X] T030 [P] [US1] Create User model in backend/app/models/user.py (fields: id UUID, email str unique indexed, password_hash str, created_at datetime; no tasks relationship yet)
- [X] T031 [US1] Create auth schemas in backend/app/schemas/auth.py (SignupRequest: email + password, SigninRequest: email + password, TokenResponse: user_id + email + token)
- [X] T032 [US1] Implement auth service in backend/app/services/auth_service.py (functions: hash_password using bcrypt, verify_password, create_jwt_token with user_id claim and expiration, decode_jwt_token)
- [X] T033 [US1] Implement auth router in backend/app/routers/auth.py (POST /api/auth/signup: validate email format, hash password, create user, return JWT; POST /api/auth/signin: verify credentials, return JWT or 401)
- [X] T034 [US1] Create Alembic migration for User table in backend/alembic/versions/001_create_users_table.py (add User table with unique email constraint)
- [X] T035 [US1] Register auth router in backend/app/main.py (app.include_router(auth_router))
- [X] T036 [US1] Run backend tests (pytest backend/tests/test_auth.py) and verify all pass

### Frontend Tests for User Story 1

- [X] T037 [P] [US1] Component test for Signup form in frontend/tests/components/SignupForm.test.tsx (verify form submission, validation, error display)
- [X] T038 [P] [US1] Component test for Signin form in frontend/tests/components/SigninForm.test.tsx (verify form submission, token storage, redirect)

### Frontend Implementation for User Story 1

- [X] T039 [P] [US1] Create auth types in frontend/src/types/auth.ts (User: user_id + email, SignupRequest, SigninRequest, TokenResponse)
- [X] T040 [US1] Create useAuth hook in frontend/src/hooks/useAuth.ts (wrap AuthContext, expose login, logout, signup, user state)
- [X] T041 [US1] Create signup page in frontend/src/app/signup/page.tsx (form with email + password inputs, validation, submit to POST /api/auth/signup, store token, redirect to /dashboard)
- [X] T042 [US1] Create signin page in frontend/src/app/signin/page.tsx (form with email + password inputs, submit to POST /api/auth/signin, store token, redirect to /dashboard)
- [X] T043 [US1] Create landing page in frontend/src/app/page.tsx (Hero component with CTA buttons linking to /signup and /signin)
- [X] T044 [US1] Create Hero component in frontend/src/components/Hero.tsx (full viewport height, gradient background, fade-in animation, centered headline, CTA buttons)
- [X] T045 [US1] Update AuthContext to implement signup and signin methods (call backend API, store token, update user state)
- [X] T046 [US1] Add protected route logic (redirect to /signin if no token in localStorage)
- [X] T047 [US1] Run frontend tests (npm test) and verify all pass

**Checkpoint**: User Story 1 complete - users can signup, signin, receive JWT tokens, and access protected routes. Test independently by creating account and authenticating.

---

## Phase 3: User Story 2 - Create and View Personal Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable authenticated users to create tasks with title/description and view only their own tasks (user-scoped data access enforced)

**Independent Test**: Authenticate → create multiple tasks → verify tasks appear in list → create second user → verify users see only their own tasks (no cross-user data leaks)

### Backend Tests for User Story 2

- [ ] T048 [P] [US2] Contract test for GET /api/{user_id}/tasks in backend/tests/test_tasks.py (verify 200 response, only user's tasks returned, 401 without token)
- [ ] T049 [P] [US2] Contract test for POST /api/{user_id}/tasks in backend/tests/test_tasks.py (verify 201 response, task created with user_id, 403 if user_id mismatch)
- [ ] T050 [P] [US2] Integration test for task ownership in backend/tests/test_tasks.py (user A creates task, user B cannot access via API, returns 403)

### Backend Implementation for User Story 2

- [ ] T051 [US2] Create Task model in backend/app/models/task.py (fields: id UUID, user_id UUID foreign_key to User.id indexed, title str min 1 max 255, description str optional, status str default "pending", created_at datetime, updated_at datetime; add tasks relationship to User model)
- [ ] T052 [US2] Create task schemas in backend/app/schemas/task.py (TaskCreate: title + description optional, TaskUpdate: title + description + status, TaskResponse: all fields including id/timestamps)
- [ ] T053 [US2] Implement task service in backend/app/services/task_service.py (functions: get_user_tasks with user_id filter, create_task with user_id and auto status "pending", validate_task_ownership returns True/False)
- [ ] T054 [US2] Implement task router in backend/app/routers/tasks.py (GET /api/{user_id}/tasks: verify JWT user_id matches path user_id or 403, filter tasks by user_id; POST /api/{user_id}/tasks: verify ownership, create task, return 201)
- [ ] T055 [US2] Create Alembic migration for Task table in backend/alembic/versions/002_create_tasks_table.py (add Task table with foreign key to User, index on user_id)
- [ ] T056 [US2] Register task router in backend/app/main.py (app.include_router(tasks_router))
- [ ] T057 [US2] Run backend tests and verify task ownership enforcement works (403 for cross-user access)

### Frontend Tests for User Story 2

- [ ] T058 [P] [US2] Component test for TaskList in frontend/tests/components/TaskList.test.tsx (verify tasks render, empty state, loading state)
- [ ] T059 [P] [US2] Component test for TaskForm in frontend/tests/components/TaskForm.test.tsx (verify form submission, validation, error handling)

### Frontend Implementation for User Story 2

- [ ] T060 [P] [US2] Create task types in frontend/src/types/task.ts (Task: id + user_id + title + description + status + timestamps, TaskCreate, TaskUpdate)
- [ ] T061 [US2] Create useTasks hook in frontend/src/hooks/useTasks.ts (fetch tasks from GET /api/{user_id}/tasks, create task via POST, local state management, loading/error states)
- [ ] T062 [US2] Create TaskList component in frontend/src/components/TaskList.tsx (fetch tasks using useTasks, map over tasks, display TaskCard for each, empty state if no tasks, loading spinner)
- [ ] T063 [US2] Create TaskCard component in frontend/src/components/TaskCard.tsx (display task title, description, status, created date, clickable to open detail)
- [ ] T064 [US2] Create TaskForm component in frontend/src/components/TaskForm.tsx (modal form with title input required, description textarea optional, submit button, validation, close button)
- [ ] T065 [US2] Create dashboard page in frontend/src/app/dashboard/page.tsx (protected route, display TaskList, floating "Add Task" button opens TaskForm modal)
- [ ] T066 [US2] Add task creation logic to useTasks (POST to backend, optimistically update local state, handle errors)
- [ ] T067 [US2] Run frontend tests and verify task list displays correctly

**Checkpoint**: User Story 2 complete - authenticated users can create and view their own tasks. Test independently by creating tasks as different users and verifying isolation.

---

## Phase 4: User Story 3 - Update Task Status and Details (Priority: P2)

**Goal**: Allow authenticated users to update task status (pending ↔ completed) and edit title/description with data persistence

**Independent Test**: Authenticate → create task → mark as completed → verify status persists → edit title/description → refresh page → verify changes persisted

### Backend Tests for User Story 3

- [ ] T068 [P] [US3] Contract test for PUT /api/{user_id}/tasks/{task_id} in backend/tests/test_tasks.py (verify 200 response, task updated, updated_at changed, 403 if not owner)
- [ ] T069 [P] [US3] Contract test for PATCH /api/{user_id}/tasks/{task_id} in backend/tests/test_tasks.py (verify partial update works, only specified fields change, 403 if not owner)

### Backend Implementation for User Story 3

- [ ] T070 [US3] Extend task service in backend/app/services/task_service.py (functions: update_task_full for PUT, update_task_partial for PATCH, both validate ownership and update updated_at timestamp)
- [ ] T071 [US3] Implement update endpoints in backend/app/routers/tasks.py (PUT /api/{user_id}/tasks/{task_id}: verify ownership, update all fields, return 200; PATCH /api/{user_id}/tasks/{task_id}: verify ownership, update specified fields only, return 200)
- [ ] T072 [US3] Add validation for status field (only accept "pending" or "completed") in backend/app/schemas/task.py
- [ ] T073 [US3] Run backend tests and verify updates enforce ownership (403 for other users' tasks)

### Frontend Tests for User Story 3

- [ ] T074 [P] [US3] Component test for task status toggle in frontend/tests/components/TaskCard.test.tsx (verify checkbox toggles status, PATCH request sent)
- [ ] T075 [P] [US3] Component test for task edit form in frontend/tests/components/TaskForm.test.tsx (verify form pre-populates with existing data, PUT request sent)

### Frontend Implementation for User Story 3

- [ ] T076 [US3] Extend useTasks hook with update functions (updateTaskStatus for PATCH, updateTask for PUT, optimistic updates)
- [ ] T077 [US3] Add status toggle to TaskCard component (checkbox or button, calls updateTaskStatus, visual feedback for pending vs completed)
- [ ] T078 [US3] Create task detail/edit page in frontend/src/app/dashboard/[taskId]/page.tsx (fetch task by ID, display TaskForm with pre-populated data, submit updates via PUT)
- [ ] T079 [US3] Extend TaskForm component to support edit mode (accept initial task data, change submit button text to "Update", call PUT instead of POST)
- [ ] T080 [US3] Add visual feedback for task status (different styling for completed tasks: strikethrough, muted color, checkmark icon)
- [ ] T081 [US3] Run frontend tests and verify updates work correctly

**Checkpoint**: User Story 3 complete - users can update task status and edit details. Test by marking tasks complete and editing fields.

---

## Phase 5: User Story 4 - Delete Tasks (Priority: P2)

**Goal**: Enable authenticated users to permanently delete their own tasks with confirmation and proper cleanup

**Independent Test**: Authenticate → create task → delete task → verify removed from list → attempt to retrieve deleted task by ID → receive 404

### Backend Tests for User Story 4

- [ ] T082 [P] [US4] Contract test for DELETE /api/{user_id}/tasks/{task_id} in backend/tests/test_tasks.py (verify 204 No Content, task removed from DB, 403 if not owner, 404 if already deleted)
- [ ] T083 [P] [US4] Integration test for task deletion in backend/tests/test_tasks.py (delete task, verify GET by ID returns 404, verify not in user's task list)

### Backend Implementation for User Story 4

- [ ] T084 [US4] Implement delete function in backend/app/services/task_service.py (delete_task: validate ownership, delete from DB, return success or 404)
- [ ] T085 [US4] Implement DELETE endpoint in backend/app/routers/tasks.py (DELETE /api/{user_id}/tasks/{task_id}: verify ownership or 403, call delete_task, return 204 No Content)
- [ ] T086 [US4] Implement GET single task endpoint in backend/app/routers/tasks.py (GET /api/{user_id}/tasks/{task_id}: verify ownership, return task or 404)
- [ ] T087 [US4] Run backend tests and verify deletion works correctly

### Frontend Tests for User Story 4

- [ ] T088 [P] [US4] Component test for delete button in frontend/tests/components/TaskCard.test.tsx (verify confirmation modal, DELETE request sent, task removed from list)

### Frontend Implementation for User Story 4

- [ ] T089 [US4] Extend useTasks hook with deleteTask function (send DELETE request, remove from local state, handle errors)
- [ ] T090 [US4] Add delete button to TaskCard component (trash icon, opens confirmation modal, calls deleteTask on confirm)
- [ ] T091 [US4] Add confirmation modal for delete action (Modal component with "Are you sure?" message, Cancel and Delete buttons)
- [ ] T092 [US4] Add error handling for 404 (task not found) in useTasks (display user-friendly message)
- [ ] T093 [US4] Run frontend tests and verify deletion works correctly

**Checkpoint**: User Story 4 complete - users can delete their own tasks. Test by deleting tasks and verifying removal.

---

## Phase 6: User Story 5 - Responsive and Animated UI Experience (Priority: P3)

**Goal**: Deliver smooth, visually appealing, mobile-responsive UI with animations that enhance (not hinder) usability

**Independent Test**: Access app on mobile (375px), tablet (768px), desktop (1440px) → verify layout adapts correctly → verify animations complete <300ms → test interactions on touch and mouse

### Frontend Tests for User Story 5

- [ ] T094 [P] [US5] Responsive design tests in frontend/tests/integration/responsive.test.tsx (verify breakpoints: 375px, 768px, 1440px; layout adapts; no horizontal scroll)
- [ ] T095 [P] [US5] Animation performance tests (verify animations complete within 300ms, no jank, smooth transitions)

### Frontend Implementation for User Story 5

- [ ] T096 [P] [US5] Add mobile-first responsive styles to Hero component (full viewport on mobile, padding adjustments, font scaling)
- [ ] T097 [P] [US5] Add responsive styles to TaskList and TaskCard (grid layout on desktop, stack on mobile, touch-friendly spacing)
- [ ] T098 [P] [US5] Add responsive styles to dashboard page (sidebar on desktop, hamburger menu on mobile, touch-friendly buttons)
- [ ] T099 [P] [US5] Implement hero section animations (fade-in on load, parallax scroll effect optional, smooth CTA hover effects)
- [ ] T100 [P] [US5] Implement modal animations (fade-in backdrop, slide-in content, smooth open/close transitions <300ms)
- [ ] T101 [P] [US5] Implement task card animations (hover effects on desktop, press effects on mobile, smooth status toggle)
- [ ] T102 [P] [US5] Add page transition animations (fade between pages using Next.js App Router transitions)
- [ ] T103 [US5] Optimize animation performance (use CSS transforms, avoid layout thrashing, use will-change sparingly)
- [ ] T104 [US5] Test on physical devices (iOS Safari, Android Chrome, responsive mode in browsers)
- [ ] T105 [US5] Run Lighthouse audit (verify score >70, no cumulative layout shift, fast First Contentful Paint)

**Checkpoint**: User Story 5 complete - UI is responsive across devices and animations are smooth. Test on multiple screen sizes and devices.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories, final validation, and documentation

### Error Handling & Validation

- [ ] T106 [P] Add global error boundary in frontend/src/app/layout.tsx (catch React errors, display friendly message, log to console)
- [ ] T107 [P] Add 404 page in frontend/src/app/not-found.tsx (friendly message, link back to dashboard)
- [ ] T108 [P] Improve error messages in backend (consistent format, no stack traces in production, log errors server-side)
- [ ] T109 [P] Add input sanitization on backend (prevent XSS in task title/description, validate email format strictly)

### Performance Optimization

- [ ] T110 [P] Optimize frontend bundle size (analyze with webpack-bundle-analyzer, code split large components, lazy load modals)
- [ ] T111 [P] Add database indexes in backend (verify indexes on user_id and email exist, add composite index if needed)
- [ ] T112 [P] Implement connection pooling in backend/app/database.py (configure min/max pool size for Neon)
- [ ] T113 [P] Add memoization to frontend components (React.memo for TaskCard, useMemo for expensive computations)

### Security Hardening

- [ ] T114 [P] Verify password hashing strength (bcrypt cost factor 12+, test password validation)
- [ ] T115 [P] Add rate limiting to auth endpoints (optional, prevent brute force attacks)
- [ ] T116 [P] Ensure HTTPS-only in production (configure deployment platform, set secure cookies if using)
- [ ] T117 [P] Audit CORS configuration (verify only whitelisted origins allowed, no wildcard in production)

### Documentation

- [ ] T118 [P] Create README.md in repository root (project overview, tech stack, setup instructions for local dev, environment variables guide)
- [ ] T119 [P] Document API endpoints using FastAPI automatic docs (verify /docs and /redoc accessible, add descriptions to endpoints)
- [ ] T120 [P] Create CONTRIBUTING.md (guidelines for running tests, code style, git workflow)

### Testing & Validation

- [ ] T121 Run full backend test suite (pytest backend/tests/ -v, verify all tests pass, check coverage >80%)
- [ ] T122 Run full frontend test suite (npm test, verify all tests pass, check coverage >70%)
- [ ] T123 Run end-to-end user flow tests (signup → signin → create tasks → update → delete → logout)
- [ ] T124 Verify all acceptance criteria from spec.md (checklist in spec.md lines 205-220)
- [ ] T125 Run Lighthouse audit on deployed app (verify performance >70, accessibility >90, best practices >90)
- [ ] T126 Security audit (verify no JWT bypass, no cross-user data access, no plaintext passwords in DB)

### Deployment Preparation

- [ ] T127 [P] Test Docker Compose locally (docker-compose up, verify frontend/backend connect, database migrations run)
- [ ] T128 [P] Create deployment documentation (guide for deploying frontend to Vercel, backend to Railway/Render, Neon DB setup)
- [ ] T129 [P] Verify environment variables documented (list all required vars, example values, where to get secrets)
- [ ] T130 [P] Test production build (frontend: npm run build, backend: verify Dockerfile builds, no dev dependencies in prod)

**Checkpoint**: All polish tasks complete - app is production-ready, tested, documented, and deployable.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 0)**: No dependencies - can start immediately
- **Foundational (Phase 1)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 2-6)**: All depend on Foundational phase completion
  - User Story 1 (Auth) MUST complete before User Story 2 (Tasks) - tasks require authentication
  - User Story 2 (Create/View) MUST complete before User Story 3 (Update) - cannot update non-existent tasks
  - User Story 2 MUST complete before User Story 4 (Delete) - cannot delete non-existent tasks
  - User Story 5 (UI/Animations) can start after User Story 2 (requires basic UI to animate)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - Auth)**: Depends on Foundational (Phase 1) - NO dependencies on other stories
- **User Story 2 (P1 - Create/View Tasks)**: Depends on User Story 1 (requires authentication)
- **User Story 3 (P2 - Update Tasks)**: Depends on User Story 2 (requires existing tasks)
- **User Story 4 (P2 - Delete Tasks)**: Depends on User Story 2 (requires existing tasks)
- **User Story 5 (P3 - UI/Animations)**: Depends on User Story 2 (requires basic UI to enhance)

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Backend: Models → Schemas → Services → Routers → Tests pass
- Frontend: Types → Hooks → Components → Pages → Tests pass
- Story complete (all tests pass) before moving to next priority

### Parallel Opportunities

- **Phase 0 (Setup)**: All tasks marked [P] can run in parallel (T002-T010)
- **Phase 1 (Foundation)**: Backend foundation (T011-T015) and Frontend foundation (T016-T021) can run in parallel; UI components (T022-T026) can run in parallel
- **Within User Stories**: All tasks marked [P] can run in parallel (tests, models, independent components)
- **User Stories**: US3 and US4 can run in parallel after US2 completes (both depend only on US2, not each other)

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 0: Setup (T001-T010)
2. Complete Phase 1: Foundational (T011-T026) - CRITICAL
3. Complete Phase 2: User Story 1 - Auth (T027-T047)
4. **STOP and VALIDATE**: Test signup, signin, JWT flow independently
5. Complete Phase 3: User Story 2 - Create/View Tasks (T048-T067)
6. **STOP and VALIDATE**: Test task creation, viewing, user isolation
7. **MVP ACHIEVED**: Deploy and demo core functionality

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (Auth working!)
3. Add User Story 2 → Test independently → Deploy/Demo (MVP! - Core CRUD working)
4. Add User Story 3 → Test independently → Deploy/Demo (Update tasks)
5. Add User Story 4 → Test independently → Deploy/Demo (Delete tasks)
6. Add User Story 5 → Test independently → Deploy/Demo (Polished UI)
7. Polish phase → Final production release

### Critical Path (Shortest path to working app)

**Must complete in order**:
1. Phase 0 (Setup) → Phase 1 (Foundation) → Phase 2 (US1 Auth) → Phase 3 (US2 Create/View) = Working MVP

**Can be parallelized after MVP**:
- US3 (Update) and US4 (Delete) can be developed in parallel
- US5 (UI/Animations) can be developed alongside US3/US4

---

## Notes

- [P] tasks = different files, no dependencies, safe to parallelize
- [Story] label (US1-US5) maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD approach)
- Commit after each task or logical group (atomic commits)
- Stop at any checkpoint to validate story independently
- Backend and frontend can be developed in parallel within each phase once foundation is ready
- All 130 tasks cover complete implementation from setup to production-ready deployment

**Total Tasks**: 130 tasks organized into 8 phases (Setup, Foundation, 5 User Stories, Polish)

**Estimated Effort**:
- Setup + Foundation: ~15-20 tasks (critical blocking work)
- User Story 1 (Auth): ~21 tasks (foundational for all protected features)
- User Story 2 (Tasks CRUD - Create/View): ~20 tasks (core functionality)
- User Story 3 (Update): ~14 tasks (enhancement)
- User Story 4 (Delete): ~12 tasks (enhancement)
- User Story 5 (UI/Animations): ~12 tasks (polish)
- Polish & Validation: ~16 tasks (final hardening)

**MVP Milestone**: Completing through User Story 2 (T001-T067, ~67 tasks) delivers a working authenticated task management application.
