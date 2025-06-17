#!/bin/bash
echo "📝 Commit rápido de todos los cambios..."
git add .
echo "Escribe tu mensaje de commit:"
read msg
git commit -m "$msg"
