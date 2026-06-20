from fastapi import APIRouter

router = APIRouter()

# Simple mock data to serve until user adds real data via platform
DEFAULT_STATS = {
    "student": {
        "stats": [
            {"label": "Applications", "value": "12", "change": "+2 this week"},
            {"label": "Learning Hours", "value": "45", "change": "+5 this week"},
            {"label": "Skills Gained", "value": "8", "change": "2 pending"},
            {"label": "Mentors", "value": "2", "change": "Active"}
        ]
    },
    "startup": {
        "stats": [
            {"label": "Active Tasks", "value": "5", "change": "2 need attention"},
            {"label": "Team Size", "value": "12", "change": "+3 this month"},
            {"label": "Completion Rate", "value": "94%", "change": "+2.5%"},
            {"label": "Budget Spent", "value": "$4.2k", "change": "Within limit"}
        ]
    },
    "professional": {
        "stats": [
            {"label": "Active Projects", "value": "3", "change": "1 near deadline"},
            {"label": "Hours Logged", "value": "142", "change": "+12 this week"},
            {"label": "Total Earnings", "value": "$8,450", "change": "+$1,200 this month"},
            {"label": "Client Rating", "value": "4.9", "change": "Top Rated"}
        ]
    },
    "investor": {
        "stats": [
            {"label": "Total Portfolio", "value": "$2.4M", "change": "+12.5% YoY"},
            {"label": "Active Investments", "value": "8", "change": "2 new this quarter"},
            {"label": "Average Return", "value": "3.2x", "change": "Track record"},
            {"label": "Opportunities viewed", "value": "45", "change": "This month"}
        ]
    },
    "mentor": {
        "stats": [
            {"label": "Active Mentees", "value": "12", "change": "+2 this month"},
            {"label": "Sessions Completed", "value": "48", "change": "150 hours"},
            {"label": "Average Rating", "value": "4.9", "change": "From 40 reviews"},
            {"label": "Unread Messages", "value": "5", "change": "Needs attention"}
        ]
    }
}

@router.get("/{role}/stats")
def get_dashboard_stats(role: str):
    stats = DEFAULT_STATS.get(role, {"stats": []})
    return stats
