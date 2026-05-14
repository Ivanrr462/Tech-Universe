#!/bin/bash
echo "=== CHECK SERVICES ==="
systemctl list-units --type=service | grep apache || true
which apache2 || true


systemctl reload apache2 2>/dev/null || true