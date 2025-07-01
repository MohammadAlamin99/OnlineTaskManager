"use client"

import { useEffect, useRef, useState } from "react"
import { UpdateTaskRequest, getUpdateTaskRequest } from "../apiRequiest/apiRequiest"
import toast, { Toaster } from "react-hot-toast";

const EditCarosal = ({ props }) => {
    const { taskId } = props
    const { hideUpdate } = props

    const titleRef = useRef()
    const descriptionRef = useRef()
    const categoryRef = useRef()
    const statusRef = useRef()
    const priorityRef = useRef()
    const dueDateRef = useRef()

    // Loading state
    const [isLoading, setIsLoading] = useState(false)

    // store update default data
    const [update, setUpdate] = useState([])

    useEffect(() => {
        ; (async () => {
            try {
                const result = await getUpdateTaskRequest(taskId)
                setUpdate(result[0])
            } catch (error) {
                console.error("Error fetching task data:", error)
                toast.error("Failed to load task data.")
            }
        })()
    }, [taskId])

    useEffect(() => {
        if (update && statusRef.current && priorityRef.current && dueDateRef.current) {
            statusRef.current.value = update.status
            priorityRef.current.value = update.priority
            dueDateRef.current.value = update.dueDate ? new Date(update.dueDate).toISOString().split("T")[0] : ""
        }
    }, [update])

    const onUpdateHandler = async () => {
        try {
            setIsLoading(true)

            const title = titleRef.current.value
            const description = descriptionRef.current.value
            const category = categoryRef.current.value
            const status = statusRef.current.value
            const priority = priorityRef.current.value
            const dueDate = dueDateRef.current.value

            await UpdateTaskRequest(taskId, title, description, dueDate, priority, status, category)

            toast.success("Task updated successfully!")

            // Delay the reload to show the toast
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        } catch (error) {
            console.error("Error updating task:", error)
            toast.error("Failed to update task. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Toast Notification */}
            <Toaster position="top-center" />

            {/* Modal Backdrop */}
            <div className="modal-backdrop fade show"></div>

            {/* Modal */}
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="editTaskModal"
                aria-hidden="true"
                style={{ overflowY: 'auto' }}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editTaskModal">
                                Edit Task
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={hideUpdate}
                                disabled={isLoading}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="taskTitle" className="form-label fw-bold">
                                        Title
                                    </label>
                                    <input
                                        ref={titleRef}
                                        id="taskTitle"
                                        defaultValue={update.title}
                                        type="text"
                                        className="form-control w-100"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="taskDescription" className="form-label fw-bold">
                                        Description
                                    </label>
                                    <textarea
                                        ref={descriptionRef}
                                        id="taskDescription"
                                        defaultValue={update.description}
                                        className="form-control w-100"
                                        rows="4"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="taskCategory" className="form-label fw-bold">
                                        Category
                                    </label>
                                    <input
                                        ref={categoryRef}
                                        id="taskCategory"
                                        defaultValue={update.category}
                                        type="text"
                                        className="form-control w-100"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="taskStatus" className="form-label fw-bold">
                                            Status
                                        </label>
                                        <select ref={statusRef} id="taskStatus" className="form-select" disabled={isLoading}>
                                            <option value="TODO">TODO</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="taskPriority" className="form-label fw-bold">
                                            Priority
                                        </label>
                                        <select ref={priorityRef} id="taskPriority" className="form-select" disabled={isLoading}>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="taskDueDate" className="form-label fw-bold">
                                            Due Date
                                        </label>
                                        <input
                                            ref={dueDateRef}
                                            id="taskDueDate"
                                            type="date"
                                            className="form-control"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="cencell_common_btn me-2" onClick={hideUpdate} disabled={isLoading}>
                                Cancel
                            </button>
                            <button type="button" onClick={onUpdateHandler} className="commonBtn" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Updating...
                                    </>
                                ) : (
                                    "Update"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCarosal