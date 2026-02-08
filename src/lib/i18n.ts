import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Navigation
      search: "Search",
      searchPlaceholder: "Search tasks...",
      aiAssistant: "AI Assistant",
      inbox: "Inbox",
      calendar: "Calendar",
      settings: "Settings",
      sharedPages: "Shared Pages",
      privatePages: "Private Pages",

      // Views
      board: "Board",
      list: "List",
      timeline: "Timeline",

      // Kanban columns
      todo: "To-do",
      onProgress: "On Progress",
      needReview: "Need Review",
      done: "Done",

      // Task actions
      addTask: "Add Task",
      createTask: "Create Task",
      editTask: "Edit Task",
      deleteTask: "Delete Task",
      deleteConfirm: "Are you sure you want to delete this task?",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",

      // Task fields
      taskTitle: "Task Title",
      description: "Description",
      dueDate: "Due Date",
      startDate: "Start Date",
      priority: "Priority",
      status: "Status",
      assignee: "Assignee",
      checklist: "Checklist",
      attachments: "Attachments",
      comments: "Comments",

      // Priority levels
      high: "High",
      medium: "Medium",
      low: "Low",

      // Pages
      designSystem: "Design System",
      marketingCampaign: "Marketing Campaign",
      productRoadmap: "Product Roadmap",
      personalNotes: "Personal Notes",
      learningGoals: "Learning Goals",
      addPage: "Add page",

      // Misc
      upgrade: "Upgrade",
      upgradeMessage: "Get access to all features",
      tasks: "tasks",
      noTasks: "No tasks yet",
      loading: "Loading...",
      error: "Something went wrong",
      retry: "Retry",

      // User
      profile: "Profile",
      logout: "Logout",

      // Filters
      filter: "Filter",
      sort: "Sort",
      sortBy: "Sort by",
      all: "All",

      // Days
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",

      // Theme
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System",

      // Language
      language: "Language",
      english: "English",
      french: "French",
    },
  },
  fr: {
    translation: {
      // Navigation
      search: "Rechercher",
      searchPlaceholder: "Rechercher des tâches...",
      aiAssistant: "Assistant IA",
      inbox: "Boîte de réception",
      calendar: "Calendrier",
      settings: "Paramètres",
      sharedPages: "Pages Partagées",
      privatePages: "Pages Privées",

      // Views
      board: "Tableau",
      list: "Liste",
      timeline: "Chronologie",

      // Kanban columns
      todo: "À faire",
      onProgress: "En cours",
      needReview: "À réviser",
      done: "Terminé",

      // Task actions
      addTask: "Ajouter une tâche",
      createTask: "Créer une tâche",
      editTask: "Modifier la tâche",
      deleteTask: "Supprimer la tâche",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer cette tâche?",
      cancel: "Annuler",
      save: "Enregistrer",
      delete: "Supprimer",

      // Task fields
      taskTitle: "Titre de la tâche",
      description: "Description",
      dueDate: "Date limite",
      startDate: "Date de début",
      priority: "Priorité",
      status: "Statut",
      assignee: "Assigné à",
      checklist: "Liste de contrôle",
      attachments: "Pièces jointes",
      comments: "Commentaires",

      // Priority levels
      high: "Haute",
      medium: "Moyenne",
      low: "Basse",

      // Pages
      designSystem: "Système de Conception",
      marketingCampaign: "Campagne Marketing",
      productRoadmap: "Feuille de Route Produit",
      personalNotes: "Notes Personnelles",
      learningGoals: "Objectifs d'Apprentissage",
      addPage: "Ajouter une page",

      // Misc
      upgrade: "Mettre à niveau",
      upgradeMessage: "Accédez à toutes les fonctionnalités",
      tasks: "tâches",
      noTasks: "Aucune tâche pour le moment",
      loading: "Chargement...",
      error: "Une erreur est survenue",
      retry: "Réessayer",

      // User
      profile: "Profil",
      logout: "Déconnexion",

      // Filters
      filter: "Filtrer",
      sort: "Trier",
      sortBy: "Trier par",
      all: "Tout",

      // Days
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",

      // Theme
      theme: "Thème",
      light: "Clair",
      dark: "Sombre",
      system: "Système",

      // Language
      language: "Langue",
      english: "Anglais",
      french: "Français",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
