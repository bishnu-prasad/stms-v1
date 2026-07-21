import os
import re

mapping = {
    'OverviewScreen': 'overview/OverviewPage',
    'AnalyticsScreen': 'analytics/AnalyticsPage',
    'BillingScreen': 'billing/BillingPage',
    'PlatformHealthScreen': 'platform-health/PlatformHealthPage',
    'ProfileScreen': 'profile/ProfilePage',
    'SettingsScreen': 'settings/SettingsPage',
    # Super Admin screens
    'CustomersScreen': '../super-admin/customers/CustomersPage',
    'ReportsScreen': '../super-admin/reports/ReportsPage',
    'SitesScreen': '../super-admin/sites/SitesPage',
    'UsersScreen': '../super-admin/users/UsersPage',
    'VendorsScreen': '../super-admin/vendors/VendorsPage',
    'SystemScreen': '../super-admin/system/SystemPage'
}

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for screen, new_path in mapping.items():
        if f'screens/{screen}' in new_content:
            new_content = new_content.replace(f'screens/{screen}', new_path)
            
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)

for root, _, files in os.walk('app/(owner)'):
    for file in files:
        if file.endswith('.tsx'):
            fix_file(os.path.join(root, file))

