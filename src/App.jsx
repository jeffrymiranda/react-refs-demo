import {useState} from "react";
import NewProject from "./components/NewProject.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";

function App() {

    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    });

    function handleStartAddProject() {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProjectId: null
        }));
    }

    function handleCancelAddProject() {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProjectId: undefined
        }));
    }

    function handleAddProject(projectData) {
        setProjectsState(prevState => {
            const projectId = Math.random();
            const newProject = {
                ...projectData,
                id: projectId
            };
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject]
            }
        });
    }

    function handleSelectProject(id) {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProjectId: id
        }));
    }

    function handleDeleteProject() {
        setProjectsState(prevState => ({
            ...prevState,
            selectedProjectId: undefined,
            projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId)
        }));
    }

    function handleAddTask(task) {
        setProjectsState(prevState => {
            const taskId = Math.random();
            const newTask = {
                text: task,
                projectId: prevState.selectedProjectId,
                id: taskId
            };
            return {
                ...prevState,
                tasks: [...prevState.tasks, newTask]
            }
        });
    }

    function handleDeleteTask(id) {
        setProjectsState(prevState => ({
            ...prevState,
            tasks: prevState.tasks.filter(task => task.id !== id)
        }));

    }

    const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
    let content = <SelectedProject project={selectedProject}
                                   onDelete={handleDeleteProject}
                                   onAddTask={handleAddTask}
                                   onDeleteTask={handleDeleteTask}
                                   tasks={projectsState.tasks}/>;

    if (projectsState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar onStartAddProject={handleStartAddProject}
                             projects={projectsState.projects}
                             onSelectProject={handleSelectProject}
                             selectedProjectId={projectsState.selectedProjectId}/>
            {content}
        </main>
    );
}

export default App;
