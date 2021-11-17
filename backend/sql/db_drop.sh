#!/bin/bash
#
# Restaura o banco local das fixtures
#

source ./sql/environment

psql -d postgres -c "drop database if exists $PGDATABASE;"
psql -d postgres -c "create database $PGDATABASE owner $PGUSER;"
